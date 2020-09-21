import React from 'react';
import commentBox from 'commentbox.io';

export default class CommentBox extends React.Component {
    componentDidMount() {
        this.removeCommentBox = commentBox('5743485734879232-proj');
    }
    componentWillUnmount() {
        this.removeCommentBox();
    }
    render() {
        return (
            <div className="commentbox" id={this.props.id}
            />
        );
    }
}