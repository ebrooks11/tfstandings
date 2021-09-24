import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import './index.css';
import Team from  './team.js';
import {breakMultiTeamTies} from './tiebreaker.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Season from './season';

var ScoringSystem = {
    standard: 0,
    twoone: 1
}

var seasons = [
    new Season(
        ScoringSystem.twoone,
        2021,
        [
            new Team(ScoringSystem.twoone, 2021, "Gour", 1, 1, [100.2, 114.36]),
            new Team(ScoringSystem.twoone, 2021, "AK", 0, 2, [72.9, 79.16]),
            new Team(ScoringSystem.twoone, 2021, "Kev & Eazy", 0, 2, [103.36, 99.12]),
            new Team(ScoringSystem.twoone, 2021, "Palko", 1, 1, [60.46, 134]),
            new Team(ScoringSystem.twoone, 2021, "Tipples", 2, 0, [116.98, 114.42]),
            new Team(ScoringSystem.twoone, 2021, "Cruz", 1, 1, [122.24, 61.62]),
            new Team(ScoringSystem.twoone, 2021, "Tdub", 1, 1, [112.52, 72.48]),
            new Team(ScoringSystem.twoone, 2021, "Spolt", 0, 2, [89.56, 94]),
            new Team(ScoringSystem.twoone, 2021, "BJ", 2, 0, [112.56, 105.62]),
            new Team(ScoringSystem.twoone, 2021, "Ram", 2, 0, [103.36, 107]),
        ]
    ),
    new Season(
        ScoringSystem.twoone,
        2020,
        [
            new Team(ScoringSystem.twoone, 2020, "Gour", 8, 5, [132.44, 131.78, 118.4, 105.74, 163.8, 65.2, 93.9, 103.04, 87.48, 66.42, 108.62, 86.48, 97.62]),
            new Team(ScoringSystem.twoone, 2020, "AK", 7, 6, [111.02, 81.78, 105.64, 69.12, 68.02, 130.38, 128.72, 76.06, 89.14, 84.26, 110.56, 112.98, 132.3]),
            new Team(ScoringSystem.twoone, 2020, "Kev & Eazy", 6, 7, [109.4, 91.06, 92.58, 78.42, 71.5, 140.72, 117.7, 58.24, 105.72, 95.4, 109.28, 98.4, 51.42]),
            new Team(ScoringSystem.twoone, 2020, "Palko", 3, 10, [91, 96.58, 94.44, 73.84, 82.7, 97.44, 88.4, 93.82, 52.9, 92.16, 94.54, 91.8, 81.28]),
            new Team(ScoringSystem.twoone, 2020, "Tipples", 6, 7, [82.08, 138.22, 92.8, 134.4, 79.18, 64, 54.42, 56.44, 84.1, 62, 90.74, 115.44, 107.5]),
            new Team(ScoringSystem.twoone, 2020, "Codes", 5, 8, [83.1, 84.12, 85.82, 79.5, 67.86, 151.64, 99.72, 62.24, 90.26, 81.08, 58.2, 103.56, 123.44]),
            new Team(ScoringSystem.twoone, 2020, "Tdub", 7, 6, [134.16, 122.84, 110.68, 96.14, 117.46, 66.88, 143.22, 68.08, 114.34, 121.02, 104.78, 99.2, 108.82]),
            new Team(ScoringSystem.twoone, 2020, "Spolt", 9, 4, [99.5, 84.08, 101.48, 106.96, 93.92, 67.14, 117.76, 166.06, 115.46, 98.74, 114.8, 144.3, 56]),
            new Team(ScoringSystem.twoone, 2020, "BJ", 8, 5, [102.74, 87.5, 127.58, 136.38, 105.84, 76.72, 71.3, 114.88, 84.14, 90.54, 78.48, 50.1, 67.7]),
            new Team(ScoringSystem.twoone, 2020, "Lomo", 6, 7, [51.66, 97.24, 82.1, 122.2, 83.94, 71.14, 113.58, 79.92, 64.84, 93.28, 76.44, 80.74, 66.16]),
        ]
    ),
    new Season(
        ScoringSystem.twoone,
        2019,
        [
            new Team(ScoringSystem.twoone, 2019, "Gour", 4, 9, [120.1, 77.6, 128.6, 63.5, 95.3, 89.4, 73.5, 91.7, 130.6, 81.1, 86.7, 51.5, 43]),
            new Team(ScoringSystem.twoone, 2019, "AK", 7, 6, [86.7, 132.8, 88.7, 185.1, 113.1, 103.2, 74.4, 138.2, 90.9, 72.1, 85.8, 115.7, 104.7]),
            new Team(ScoringSystem.twoone, 2019, "Kevin", 7, 6, [102, 69, 119.3, 60.2, 77.1, 78.2, 94.6, 131.4, 77.5, 85.4, 67, 106.3, 63.9]),
            new Team(ScoringSystem.twoone, 2019, "Palko", 6, 7, [109.1, 98, 88.2, 124.3, 107.7, 84.4, 91.4, 93.3, 104.6, 103.2, 89.2, 93.3, 72.8]),
            new Team(ScoringSystem.twoone, 2019, "Tipples", 4, 9, [104, 99.1, 110.9, 73.9, 116.8, 78.2, 96.2, 77.9, 86.3, 94.7, 122.7, 57.5, 96.6]),
            new Team(ScoringSystem.twoone, 2019, "Codes", 5, 8, [93.5, 86.9, 80.5, 84.8, 84.9, 80.9, 52, 85.5, 113.1, 108.6, 71.1, 85.8, 114.3]),
            new Team(ScoringSystem.twoone, 2019, "Tdub", 6, 7, [76.4, 107.7, 113.6, 100.7, 101.5, 52.5, 127.5, 132.3, 82, 83.8, 68.7, 87.4, 85.7]),
            new Team(ScoringSystem.twoone, 2019, "Spolt", 10, 3, [122.9, 89.5, 107, 97.8, 178.5, 118.5, 97.9, 102.6, 110.6, 158.7, 85.7, 150, 95.9]),
            new Team(ScoringSystem.twoone, 2019, "BJ", 5, 8, [92.6, 77.4, 132, 65.3, 132.3, 159, 71.6, 114.5, 112.9, 71.1, 83.1, 73.3, 82.7]),
            new Team(ScoringSystem.twoone, 2019, "Lomo", 11, 2, [130.9, 127.7, 82.7, 90.7, 124.7, 92, 126.1, 98.4, 93.1, 120.8, 117, 97.6, 113.7]),
        ]
    ),
    new Season(
        ScoringSystem.twoone,
        2018,
        [
            new Team(ScoringSystem.twoone, 2018, "Gour", 5, 8, [140.8, 93.8, 120.4, 107.9, 96.8, 112.1, 113.9, 105.4, 87, 78.7, 119.7, 128.3, 86]),
            new Team(ScoringSystem.twoone, 2018, "AK", 9, 4, [98, 119, 92, 103, 98.4, 111.3, 107.1, 135.1, 105.1, 104.3, 120.7, 69.8, 103.5]),
            new Team(ScoringSystem.twoone, 2018, "Kevin", 9, 4, [142.1, 103.5, 97.1, 87.3, 115, 125.8, 123.2, 113.9, 116.8, 108.9, 140.3, 99.5, 119.8]),
            new Team(ScoringSystem.twoone, 2018, "Palko", 5, 8, [92.5, 149.6, 87.3, 156, 81.6, 114.3, 92.6, 90.2, 163.5, 102.7, 115, 90.2, 96.7]),
            new Team(ScoringSystem.twoone, 2018, "Tipples", 7, 6, [71.9, 116.6, 74.7, 107.2, 119.5, 80.7, 84.9, 124.9, 92.9, 106.1, 95.5, 113.1, 88.9]),
            new Team(ScoringSystem.twoone, 2018, "Codes",4, 9, [66.3, 88, 81.9, 119.1, 92.2, 131.1, 122.4, 71.1, 109.1, 84.5, 85.2, 73.1, 58.6]),
            new Team(ScoringSystem.twoone, 2018, "Tdub", 9, 4, [96.2, 97.2, 97.4, 90.3, 94.5, 63.9, 116.1, 137, 43.3, 155, 102.7, 136.6, 88.7]),
            new Team(ScoringSystem.twoone, 2018, "Spolt", 5, 8, [128.9, 98.7, 83.8, 105.9, 98.3, 136.5, 83.4, 82.1, 88.1, 132.3, 104.6, 134.5, 101.4]),
            new Team(ScoringSystem.twoone, 2018, "BJ", 8, 5, [124.1, 80.9, 114, 111.9, 120.7, 102.4, 111, 105.3, 127.9, 95.7, 117.7, 109.5, 97.2]),
            new Team(ScoringSystem.twoone, 2018, "Lomo", 4, 9, [80.7, 91, 64.1, 97, 112.7, 91.2, 83.6, 73, 90.1, 115.6, 108, 96.6, 85.6]),
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
                <td>{this.props.tablePts}</td>
                <td>{this.props.wins}</td>
                <td>{this.props.topFive}</td>
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
        var selectedYear = 2021;
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
                        if(team.scores[i] == 103.36){
                            team.topFiveFinishes += .5;
                        }else{
                            team.topFiveFinishes += 1;
                        }
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
                            tablePts={team.tablePoints()}
                            wins={team.wins}
                            topFive={team.topFiveFinishes}
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
                                    <th>Wins</th>
                                    <th>Top 5</th>
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
