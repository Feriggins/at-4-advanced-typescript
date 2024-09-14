import React, { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';

interface CommentFormProps {
    onCommentAdded: (comment: any) => void; // Adjust 'any' to a specific type if you have a Comment type
    onCommentError: (error: string) => void;
    onReset?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onCommentAdded, onCommentError, onReset }) => {
    const { id } = useParams<{ id: string }>(); // Type the URL params
    const [author, setAuthor] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [stars, setStars] = useState<number>(0);
    const [rant, setRant] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newComment = {
            author,
            content,
            stars,
            rant,
        };

        fetch(`http://localhost:5000/api/comment/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then((err) => {
                        throw new Error(err.errors ? err.errors.map((e: { msg: string }) => e.msg).join(', ') : 'Failed to add comment');
                    });
                }
            })
            .then((data) => {
                onCommentAdded(data.comment); // Notify the parent component that a comment was added
                resetForm(); // Reset form after submission
            })
            .catch((error) => onCommentError(error.message));
    };

    const resetForm = () => {
        setAuthor('');
        setContent('');
        setStars(0);
        setRant(false);
        if (onReset) onReset(); // Call the reset function from parent
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group mb-2">
                <label htmlFor="author">Author</label>
                <input
                    type="text"
                    id="author"
                    className="form-control"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </div>
            <div className="form-group mb-2">
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    className="form-control"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div className="form-group mb-2">
                <label htmlFor="stars">Star Rating: {stars}</label>
                <input
                    type="range"
                    id="stars"
                    className="form-control"
                    min="0"
                    max="5"
                    step="0.5"
                    value={stars}
                    onChange={(e) => setStars(parseFloat(e.target.value))}
                />
            </div>
            <div className="form-check mb-3">
                <input
                    type="checkbox"
                    id="rant"
                    className="form-check-input"
                    checked={rant}
                    onChange={(e) => setRant(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="rant">
                    Rant (check if true)
                </label>
            </div>
            <button type="submit" className="btn btn-primary">
                Add Comment
            </button>
        </form>
    );
};

export default CommentForm;
