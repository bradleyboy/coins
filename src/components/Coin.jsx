import React from 'react';

export default class Coin extends React.Component {
    render() {
        const styles = {
            main: {
                backgroundSize: '80%',
                width: '6%',
                height: '6%',
                background: 'yellow',
                position: 'absolute',
                left: ((this.props.x - 1) * 10) + 2 + '%',
                top: ((this.props.y - 1) * 10) + 2 + '%',
                borderRadius: '50%',
            }
        };

        return <div style={styles.main}>

        </div>
    }
}
