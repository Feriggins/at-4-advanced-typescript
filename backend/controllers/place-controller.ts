import { Request, Response } from 'express';
import { Place, Comment } from '../models';
import { validationResult } from 'express-validator';
import { HydratedDocument } from 'mongoose';
import { IPlace } from '../models/place';
import {filterUndefinedAndEmpty} from "../utils/utils";

export const getAllPlaces = async (req: Request, res: Response): Promise<Response> => {
    return await Place.find().populate('comments').lean()
        .then(places => {
            if (!places) {
                return res.status(500).send([]);
            } else {
                return res.status(200).send(places);
            }
        })
        .catch(err => {
            return res.status(500).send({error: err.message});
        });
};

export const getSpecificPlace = async (req: Request, res: Response): Promise<Response> => {
    const {id} = req.params;
    return await Place.findById(id).populate('comments').lean()
        .then(place => {
            if (!place) {
                return res.status(404).send({});
            } else {
                return res.status(200).send(place);
            }
        })
        .catch(err => {
            return res.status(404).send({error: err.message});
        });
};

export const createNewPlace = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    if (!req.body.pic) {
        req.body.pic = 'https://picsum.photos/350/350';
    }

    const filteredBody = filterUndefinedAndEmpty(req.body);
    const newPlace: HydratedDocument<IPlace> = new Place(filteredBody);

    return await newPlace.save()
        .then(savedPlace => {
            return res.status(200).send(savedPlace);
        })
        .catch(err => {
            return res.status(500).send({error: err.message});
        });
};

export const editPlace = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    if (!req.body.pic) {
        req.body.pic = 'https://picsum.photos/350/350';
    }

    const {id} = req.params;
    const updateData = filterUndefinedAndEmpty(req.body);

    return await Place.findByIdAndUpdate(
        id,
        updateData,
        {new: true, runValidators: true}
    )
        .then((updatedPlace) => {
            if (!updatedPlace) {
                return res.status(404).send({message: 'Place not found'});
            }
            return res.status(200).send(updatedPlace);
        })
        .catch((err) => {
            return res.status(500).send({error: err.message});
        });
};

export const deletePlace = async (req: Request, res: Response): Promise<Response> => {
    const {id} = req.params;

    return await Place.findById(id)
        .then(async (place) => {
            if (!place) {
                return res.status(404).send({message: 'Place not found'});
            }

            await Comment.deleteMany({_id: {$in: place.comments}});

            await Place.findByIdAndDelete(id);

            return res.status(200).send({message: 'Place and associated comments deleted successfully'});
        })
        .catch((err) => {
            return res.status(500).send({error: err.message});
        });
};
