import _ from 'lodash';

export function breakMultiTeamTies(sortedTeams) {
    var winGroups = _.groupBy(sortedTeams, (team) => {
        return team.tablePoints();
    });

    var teamTablePoints = _.map(sortedTeams, team => team.tablePoints());

    var winGroupKeys = _.uniqBy(teamTablePoints, points => points);

    var multiTeamTies = _.filter(winGroups, (group) => {
        return group.length > 2;
    });

    if (multiTeamTies.length === 0) return sortedTeams;

    multiTeamTies.forEach(winGroup => {
        var sortedGroup = breakMultiTeamTie(winGroup);

        winGroups[winGroup[0].tablePoints()] = sortedGroup;
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
    var sortedTeams = [];

    while(tiedTeams.length > 2){
        var tieWinner = getTieWinner(tiedTeams);

        sortedTeams.push(tieWinner);

        tiedTeams = _.without(tiedTeams, tieWinner);
    }

    if((tiedTeams[0].breakTie(tiedTeams[1]) > 0)){
        sortedTeams.push(tiedTeams[1]);
        sortedTeams.push(tiedTeams[0]);
    }else{
        sortedTeams.push(tiedTeams[0]);
        sortedTeams.push(tiedTeams[1]);
    }

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
    
        return getTieWinner(teamsWithMaxWins);
    }

    winningTeam = _.maxBy(teamWeekWins, teamWeekWin => teamWeekWin.weekWins).team;

    return winningTeam;
}