import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Place, Comment } from '../models';
import {HydratedDocument, Types} from 'mongoose';
import { IComment } from '../models/comment';
import { IPlace } from '../models/place';
import {filterUndefinedAndEmpty} from "../utils/utils";

export const addComment = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }

    const { id } = req.params;
    const filteredBody = filterUndefinedAndEmpty(req.body);

    const newComment: HydratedDocument<IComment> = new Comment(filteredBody);

    try {
        const place: HydratedDocument<IPlace> | null = await Place.findById(id);
        if (!place) {
            return res.status(404).send({ message: 'Place not found' });
        }

        const savedComment = await newComment.save();

        place.comments.push(savedComment._id as Types.ObjectId);
        await place.save();

        return res.status(201).send({ message: 'Comment added to place successfully', comment: savedComment });
    } catch (err: any) {
        return res.status(500).send({ error: err.message });
    }
};

export const deleteComment = (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    return Comment.findByIdAndDelete(id)
        .then(deletedComment => {
            if (!deletedComment) {
                return res.status(404).send({ message: 'Comment not found' });
            }
            return res.status(200).send({ message: 'Comment deleted successfully' });
        })
        .catch((err: any) => {
            return res.status(500).send({ error: err.message });
        });
};
