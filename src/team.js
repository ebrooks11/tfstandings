import _ from 'lodash';

export default class Team {
    constructor(year, name, wins, losses, scores, topFiveFinishes){
        // this.scoringSystem = scoringSystem;
        this.year = year;
        this.name = name;
        this.wins = wins || 0;
        this.losses = losses || 0;
        this.scores = scores || [];
        // this.topFiveFinishes = topFiveFinishes || 0;

        this.ScoringSystems = {
            standard: 0,
            twoone: 1
        }
    }

    // tablePoints(){
    //     if(this.scoringSystem === this.ScoringSystems.twoone){
    //         return (this.wins * 2) + this.topFiveFinishes;
    //     }

    //     return this.wins;
    // }

    average(){
        if(this.totalPoints() === 0) return 0;
        var totalPoints = this.totalPoints();

        var average = totalPoints/this.weeks();
        return average.toFixed(2);
    }

    totalPoints(){
        if(!this.scores || !_.some(this.scores)) return 0;
        var totalPoints = this.scores.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        });
        return totalPoints.toFixed(1);
    }

    breakTie(tiedTeam){
        var myWins = 0;
        var tiedTeamWins = 0;

        for(var i = 0; i < this.weeks(); i++){
            myWins += this.scores[i] > tiedTeam.scores[i];
            tiedTeamWins += this.scores[i] < tiedTeam.scores[i];
        }

        return tiedTeamWins - myWins;
    }

    weeks(){
        return this.scores.length;
    }
}