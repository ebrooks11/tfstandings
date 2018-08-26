import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import './index.css';
import Team from  './team.js';
import {breakMultiTeamTies} from './tiebreaker.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Season from './season';

/*
    set up for this year
        √ add property to indicate scoring system
        - add new logic for 2/1 scoring system
            - sort off of 2/1, not wins
            - consider making flow for each type

    set up hosting and go live
*/

var ScoringSystem = {
    standard: 0,
    twoone: 1
}

var seasons = [
    new Season(
        ScoringSystem.twoone,
        2018,
        [
            //120, 111, 100, 99, 97, 94, 87, 82, 75, 63
            //107, 99, 98, 98, 93, 92, 85, 84, 83.2, 82
            new Team(ScoringSystem.twoone, 2018, "Spencer Gourley", 2, 0, [120, 85]),//5
            new Team(ScoringSystem.twoone, 2018, "Amir Kaikhah", 2, 0, [94, 107]),//5
            new Team(ScoringSystem.twoone, 2018, "Evan Brooks", 2, 0, [99, 93]),//6
            new Team(ScoringSystem.twoone, 2018, "David Palko", 1, 0, [100, 98]),//4
            new Team(ScoringSystem.twoone, 2018, "Jack Lee", 1, 0, [82, 99]),//3
            new Team(ScoringSystem.twoone, 2018, "Cody Dorsett", 1, 0, [97, 84]),//3
            new Team(ScoringSystem.twoone, 2018, "Travis Walsh", 1, 0, [63, 98]),//3
            new Team(ScoringSystem.twoone, 2018, "Spencer Sobolik", 0, 0, [111, 83.2]),//1
            new Team(ScoringSystem.twoone, 2018, "Josh Green", 0, 0, [87, 82]),//0
            new Team(ScoringSystem.twoone, 2018, "Anthony Palomo", 0, 0, [75, 92]),//0
        ]
    ),
    new Season(
        ScoringSystem.standard,
        2017,
        [
            new Team(ScoringSystem.standard, 2017, "Spencer Gourley", 9, 4, [85.4, 106, 107.6, 119, 69.2, 87.5, 119.5, 122.2, 0, 80.6, 115.3, 127.6, 117.9]),
            new Team(ScoringSystem.standard, 2017, "Spencer Sobolik", 9, 4, [103.2, 101.5, 112.1, 84.2, 93.8, 111.6, 91.6, 84.7, 79.3, 98.8, 76.5, 66, 86.5]),
            new Team(ScoringSystem.standard, 2017, "Amir Kaikhah", 8, 5, [77, 86.1, 103.7, 69.6, 92.8, 90.7, 87.8, 97.3, 106.2, 82.3, 102, 128.7, 101.1]),
            new Team(ScoringSystem.standard, 2017, "Josh Green", 7, 6, [94.7, 81.9, 66.8, 108.9, 100.6, 65.3, 76.8, 108.7, 71.9, 103.6, 119.6, 95.7, 108.5]),
            new Team(ScoringSystem.standard, 2017, "Evan Brooks", 6, 7, [97, 69.8, 94.9, 85.6, 97.2, 119.4, 67.9, 95, 81.7, 70.3, 115.9, 108.4, 103.8]),
            new Team(ScoringSystem.standard, 2017, "Anthony Palomo", 6, 7, [75.7, 78.9, 101.5, 104.6, 75.6, 114, 115.4, 94.3, 117.3, 103.7, 54.4, 101.7, 76.5]),
            new Team(ScoringSystem.standard, 2017, "David Palko", 6, 7, [102.8, 116.5, 44.7, 82.7, 102.8, 81.5, 103.2, 102, 82.2, 97.9, 99.9, 91.4, 79.9]),
            new Team(ScoringSystem.standard, 2017, "Jack Lee", 6, 7, [66.2, 80.2, 89.1, 102, 119.9, 129.4, 101, 87.1, 104.5, 79.5, 96.2, 109.4, 94.3]),
            new Team(ScoringSystem.standard, 2017, "Cody Dorsett", 4, 9, [68, 121, 87.8, 96.1, 78.9, 83.3, 61, 90.7, 71.3, 94.8, 53.5, 70.3, 91.1]),
            new Team(ScoringSystem.standard, 2017, "Travis Walsh", 4, 9, [73.4, 94.5, 99.9, 77.8, 64.9, 73, 92.4, 81, 81.4, 56.4, 80, 74.1, 106.2])
        ]
    ),
    new Season(
        ScoringSystem.standard,
        2016,
        [
            new Team(ScoringSystem.standard, 2016, "Spencer Gourley", 3, 10, [86.8, 80, 84.7, 122.4, 63.3, 82.8, 108.8, 74.4, 88.8, 77.5, 91.5, 65.1, 96]),
            new Team(ScoringSystem.standard, 2016, "Spencer Sobolik", 7, 6, [122.8, 76.4, 110.6, 82.4, 71.5, 87.7, 119.4, 80, 119.2, 103.1, 117.9, 112.4, 85.8]),
            new Team(ScoringSystem.standard, 2016, "Amir Kaikhah", 6, 7, [107.9, 89.6, 63.7, 102.2, 112.9, 96.5, 67.4, 131.2, 63.3, 85.4, 72, 83.6, 119.5]),
            new Team(ScoringSystem.standard, 2016, "Josh Green", 7, 6, [125.3, 119.2, 75.3, 99.6, 120.4, 117.1, 113.7, 92.8, 65.2, 108.6, 79, 56.6, 106.3]),
            new Team(ScoringSystem.standard, 2016, "Evan Brooks", 7, 6, [87.5, 106.1, 105.5, 112, 84.9, 118.9, 75.4, 101.9, 119.7, 87.4, 107.8, 118.6, 98.1]),
            new Team(ScoringSystem.standard, 2016, "Anthony Palomo", 9, 4, [118.8, 78.5, 103.3, 88.8, 120.1, 97.4, 61.4, 114.3, 80.1, 139.7, 94.4, 150.1, 108.5]),
            new Team(ScoringSystem.standard, 2016, "David Palko", 6, 7, [100, 112.4, 124.7, 90.7, 111.3, 95.6, 107.9, 85.9, 89.6, 101, 77.1, 95.3, 100.5]),
            new Team(ScoringSystem.standard, 2016, "Jack Lee", 7, 6, [75, 102.5, 122.5, 79.7, 99.2, 112.5, 95.1, 75.2, 91.6, 103.9, 88.4, 82.4, 75.7]),
            new Team(ScoringSystem.standard, 2016, "Cody Dorsett", 6, 7, [91.2, 59.6, 95.7, 78.1, 97.8, 56.6, 112.8, 93.8, 107.8, 115.7, 83, 121.8, 50.7]),
            new Team(ScoringSystem.standard, 2016, "Travis Walsh", 7, 6, [112.9, 92.1, 83.6, 67.9, 92.8, 92.4, 73.5, 86.1, 143.6, 101.9, 91.9, 106.5, 108.9])
        ]
    )
];


class Title extends React.Component {
    render() {

        return (
            <h3>Top Flight Fantasy</h3>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="title">
                    <Title />
                </div>
            </div>
        );
    }
}

class TeamStandings extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.wins}</td>
                <td>{this.props.losses}</td>
                <td>{this.props.points}</td>
                <td>{this.props.average}</td>
            </tr>
        );
    }
}

class PointsTeamStandings extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.wins}</td>
                <td>{this.props.points}</td>
                <td>{this.props.average}</td>
            </tr>
        );
    }
}

class Option extends React.Component {
    render() {
        return (
            <option value={this.props.year}>{this.props.year}</option>
        );
    }
}

class Standings extends React.Component {

    constructor(props){
        super(props);
        var selectedYear = 2018;
        var selectedSeason = _.filter(seasons, season => season.year === selectedYear)[0];
        this.state = {value: selectedYear, season: selectedSeason};

        seasons.forEach(season => {
            var weekCount = season.teams[0].scores.length;

            for(var i = 0; i < weekCount; i++){
                var weekScores = [];
                
                season.teams.forEach(team => {
                    weekScores.push(team.scores[i]);
                });

                var sortedWeekScores = weekScores.sort(((a,b) => {return b - a;}));

                season.teams.forEach(team => {
                    if(_.indexOf(sortedWeekScores, team.scores[i]) < 5){
                        team.topFiveFinishes += 1;
                    }
                })
            }
        });

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        var selectedYear = event.target.value;
        var selectedSeason = _.filter(seasons, season => season.year.toString() === selectedYear)[0];
        this.setState({value: event.target.value, season: selectedSeason});
    }

    renderTeamStandings() {

        const rows = [];

        var orderedSeasons = _.orderBy(seasons, s => s.year);

        orderedSeasons.forEach(season => {
            var sortedTeams = season.teams.sort((a,b) => {
                
                var teamsAreTied = b.tablePoints() === a.tablePoints();
    
                if(teamsAreTied){
                    return a.breakTie(b);
                }
    
                return b.tablePoints() - a.tablePoints();
            });

            var fullySortedTeams = breakMultiTeamTies(sortedTeams);

            season.teams = fullySortedTeams;
        });

        orderedSeasons.forEach(season => {
            if(season.year.toString() === this.state.value.toString()){
                season.teams.forEach(team => {
                    if(this.state.season.scoringSystem === ScoringSystem.standard){
                        rows.push(<TeamStandings 
                            name={team.name}
                            wins={team.tablePoints()}
                            losses={team.losses}
                            points={team.totalPoints()}
                            average={team.average()}
                            key={team.name} />)
                    }

                    if(this.state.season.scoringSystem === ScoringSystem.twoone){
                        rows.push(<PointsTeamStandings 
                            name={team.name}
                            wins={team.tablePoints()}
                            points={team.totalPoints()}
                            average={team.average()}
                            key={team.name} />)
                    }
                })
            }
        });

        return (
            <tbody>
                {rows}
            </tbody>
        )
    }

    renderSeasons() {
        var options = [];

        var orderedSeasons = _.orderBy(seasons, s => s.year);

        orderedSeasons.forEach(season => options.push(<Option key={season.year} year={season.year}/>));

        return options;
    }

    renderStandings() {
        if(this.state.season.scoringSystem === ScoringSystem.standard){
            return (
                <div className="standings row justify-content-center">
                        <table className="col-4 table">
                            <thead>
                                <tr>
                                    <th>Team</th>
                                    <th>W</th>
                                    <th>L</th>
                                    <th>Pts</th>
                                    <th>Avg</th>
                                </tr>
                            </thead>
                            {this.renderTeamStandings()}
                        </table>
                    </div>
            )
        }

        if(this.state.season.scoringSystem === ScoringSystem.twoone){
            return (
                <div className="standings row justify-content-center">
                        <table className="col-4 table">
                            <thead>
                                <tr>
                                    <th>Team</th>
                                    <th>Pts</th>
                                    <th>Pts For</th>
                                    <th>Avg</th>
                                </tr>
                            </thead>
                            {this.renderTeamStandings()}
                        </table>
                    </div>
            )
        }
    }

    render() {
        return (
            <div>
                <br/>
                <div className="row justify-content-center">
                    <select value={this.state.value} onChange={this.handleChange}>
                        {this.renderSeasons()}
                    </select>
                </div>
                <br/>
                {this.renderStandings()}
            </div>
        );
    }
}

class TopFlight extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Standings />
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <TopFlight />,
    document.getElementById('root')
);
