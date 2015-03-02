import React from 'react';

export default class Wall extends React.Component {
    render() {
        const styles = {
            main: {
                width: '10%',
                height: '10%',
                background: 'gray',
                position: 'absolute',
                left: ((this.props.x - 1) * 10) + '%',
                top: ((this.props.y - 1) * 10) + '%',
            }
        };
        
        return <div style={styles.main}>

        </div>
    }
}
