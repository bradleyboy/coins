import React from 'react';

const styles = {
    main: {
        width: '50%',
        height: '50vw',
        background: 'black',
        position: 'relative',
    }
};

export default class Board extends React.Component {
    render() {
        return <div style={styles.main}>
            {this.props.children}
        </div>;
    }
}
