import _ from 'lodash';

export function breakMultiTeamTies(sortedTeams) {
    console.log("BREAK MULTI TEAM TIES")
    console.log("sortedTeams");
    console.log(sortedTeams);
    var winGroups = _.groupBy(sortedTeams, (team) => {
        // return team.tablePoints();
        return team.wins;
    });

    console.log("winGroups");
    console.log(winGroups);

    // var map = _.map(sortedTeams, team => team.tablePoints());
    var map = _.map(sortedTeams, team => team.wins);
    console.log(map);
    // var winGroupKeys = _.uniqBy(_.map(sortedTeams, team => team.tablePoints()), points => points);
    var winGroupKeys = _.uniqBy(_.map(sortedTeams, team => team.wins), points => points);

    console.log("winGroupKeys");
    console.log(winGroupKeys);

    var multiTeamTies = _.filter(winGroups, (group) => {
        return group.length > 2;
    });

    console.log("multiTeamTies");
    console.log(multiTeamTies);

    if (multiTeamTies.length === 0) return sortedTeams;

    multiTeamTies.forEach(winGroup => {
        console.log("winGroup sent to breakMultiTeamTie");
        console.log(winGroup);
        var sortedGroup = breakMultiTeamTie(winGroup);

        winGroups[winGroup[0].wins] = sortedGroup;

        console.log(winGroups);
    });

    var fullySortedTeams = [];

    _.forEach(winGroupKeys, (key) => {
        _.forEach(winGroups[key], (team) => {
            fullySortedTeams.push(team);
        })
    })

    return fullySortedTeams;
}

export function breakMultiTeamTie(tiedTeams) {
    console.log("BREAK MULTI TEAM TIE");
    
    var sortedTeams = [];

    while(tiedTeams.length > 2){
        var tieWinner = getTieWinner(tiedTeams);
        console.log("tieWinner");
        console.log(tieWinner);

        sortedTeams.push(tieWinner);

        tiedTeams = _.without(tiedTeams, tieWinner);

        console.log("tiedTeams");
        console.log(tiedTeams);
    }

    console.log("sortedTeams");
    console.log(sortedTeams);

    if((tiedTeams[0].breakTie(tiedTeams[1]) > 0)){
        sortedTeams.push(tiedTeams[1]);
        sortedTeams.push(tiedTeams[0]);
    }else{
        sortedTeams.push(tiedTeams[0]);
        sortedTeams.push(tiedTeams[1]);
    }

    console.log("sortedTeams");
    console.log(sortedTeams);

    return sortedTeams;
}

export function getTieWinner(tiedTeams){
    var numberOfWeeks = tiedTeams[0].weeks();

    var teamWeekWins = _.map(tiedTeams, (tiedTeam) => {
        return {team: tiedTeam, weekWins: 0};
    })

    var winningTeam;

    for(var i = 0; i < numberOfWeeks; i++){
        var teamScores = [];
        
        _.forEach(tiedTeams, (tiedTeam) => {
            teamScores.push({team: tiedTeam, score: tiedTeam.scores[i]});
        })

        winningTeam = _.maxBy(teamScores, teamScore => teamScore.score);

        _.find(teamWeekWins, (teamWeekWin) => {
            return teamWeekWin.team === winningTeam.team;
        }).weekWins += 1;
    }

    var maxTeamWins = _.maxBy(teamWeekWins, teamWeekWin => teamWeekWin.weekWins).weekWins;

    var teamWeekWinsWithMaxWins = _.filter(teamWeekWins, (teamWeekWin) => {
        return teamWeekWin.weekWins === maxTeamWins;
    })

    if(teamWeekWinsWithMaxWins.length > 1){
        var teamsWithMaxWins = _.map(teamWeekWinsWithMaxWins, (weekWin) => {
            return weekWin.team;
        })

        if(teamsWithMaxWins.length === tiedTeams.length){
            return teamsWithMaxWins[0];
        }
    
        console.log("teamsWithMaxWins");
        console.log(teamsWithMaxWins);

        return getTieWinner(teamsWithMaxWins);
    }

    winningTeam = _.maxBy(teamWeekWins, teamWeekWin => teamWeekWin.weekWins).team;

    return winningTeam;
}