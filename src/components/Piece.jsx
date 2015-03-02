import React from 'react';

export default class Piece extends React.Component {
    render() {
        const styles = {
            main: {
                width: '10%',
                height: '10%',
                background: this.props.color,
                position: 'absolute',
                left: ((this.props.data.position.x - 1) * 10) + '%',
                top: ((this.props.data.position.y - 1) * 10) + '%',
                borderRadius: '50%',
            }
        };

        return <div style={styles.main}>

        </div>
    }
}
