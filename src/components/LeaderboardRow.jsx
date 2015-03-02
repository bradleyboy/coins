import React from 'react';

const styles = {
    main: {
        marginBottom: 4
    }
};

export default class LoaderboardRow extends React.Component {
    render() {
        return <div style={styles.main}>
            {this.props.position}. {this.props.name} - {this.props.score}
        </div>
    }
}
