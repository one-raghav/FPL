import urllib2, urllib
import json
import csv
import datetime
import sys

baseUrl = "http://localhost:3000/"

data = json.dumps({"user":"admin","password":"testPass1" })

headers = {"Content-Type":"application/json",
	"accept":"application/json"}

token = ''

def getToken():
        req =  urllib2.Request(baseUrl+"users/authenticate", data, headers)
        response = urllib2.urlopen(req)
        body = (json.loads(response.read()))
        token = body['data']
        headers["x-access-token"] = token 
      


teams = {}
games = []
def importTeam(teamName,teamCity,members):
        data = json.dumps({ 'name':teamName,'city':teamCity,'players':members })
        req =  urllib2.Request(baseUrl+"teams", data, headers)
        response = urllib2.urlopen(req)
        team = json.loads( response.read())
        print team['status']+" , " + teamName

def importGame(date,TeamA,TeamB,city,result,tid):
        date = datetime.datetime.strptime(date, '%y/%m/%d').strftime('%Y-%m-%d')
        data = json.dumps({ 'date':date,'teamAId':TeamA,'teamBId':TeamB,'city':city,'result':result,'tournamentId':tid })
        req =  urllib2.Request(baseUrl+"games", data, headers)
        response = urllib2.urlopen(req)
        game = json.loads( response.read())
        if game['status'] == "success":
                games.append(game['data']['_id'])
        else: 
                print game

def getTeams():
        req =  urllib2.Request(baseUrl+"teams")
        response = urllib2.urlopen(req)
        responseData = json.loads( response.read());
        for team in responseData['data']:
                teams[team['name']] = team['_id']




def importTeams(fileName):
        with open(fileName, 'rb') as csvfile:
                teams = csv.reader(csvfile, delimiter=',', quotechar='|')
                for row in teams:
                        print row
                        importTeam(row[0],row[0],[row[0]])

def importGames(fileName,tid):
        with open(fileName, 'rb') as csvfile:
                lines = csv.reader(csvfile, delimiter=',', quotechar='|')
                for row in lines:
                        importGame(row[0],teams[row[1]],teams[row[2]],row[3],row[4],tid)
                return


def addTournment(name,startDate,endDate):
        data = json.dumps({ 'name':name,'startDate':startDate,"endDate":endDate })
        req =  urllib2.Request(baseUrl+"tournaments", data, headers)
        response = urllib2.urlopen(req)
        tourn = json.loads( response.read())
        print tourn
        if(tourn['status']=='success'):
                print "tournament id : "+str(tourn['data']['_id'])

import argparse

parser = argparse.ArgumentParser(description='import')
parser.add_argument("--entity",help=" games: csv --file Date,HomeTeam,AwayTeam,city,result, with tournament id \n\n teams: team name, city, player name list seperated by | \n\n tournment : name , start and end flags needed")
parser.add_argument("-f","--file",help="csv file for the input")
parser.add_argument("--tournmentId",help=" should be provided with games input")
parser.add_argument("--name",help="tournment name")
parser.add_argument("--start",help="tournment start date")
parser.add_argument("--end",help="tournment end date")
args = parser.parse_args()

getTeams()

print "---------------"+args.entity+": import started--------------"

if( args.entity == "games"):
        getToken()
        importGames(args.file,args.tournmentId)
        print "==============\n imported following games \n ================"
        print games
        #addGamesToTournment(args.tournmentId)
        
elif (args.entity == "teams"):
        getToken()
        importTeams(args.file)
        getTeams()
elif (args.entity == "tournment"):
        getToken()
        addTournment(args.name,args.start,args.end)






