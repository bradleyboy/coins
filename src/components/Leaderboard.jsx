import React from 'react';
import LeaderboardRow from './LeaderboardRow';

const styles = {
    main: {
        padding: 20
    },
    h1: {
        marginBottom: 20,
        fontSize: 35,
    }
};

export default class Leaderboard extends React.Component {
    render() {
        return <div style={styles.main}>
            <h1 style={styles.h1}>Leaderboard</h1>
            {this.props.players.map((player, index) => <LeaderboardRow
                position={index+1}
                name={this.props.currentPlayer === player.ident ? 'You' : player.ident}
                score={player.score} />)}
        </div>
    }
}
