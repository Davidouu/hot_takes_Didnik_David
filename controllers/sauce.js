const Thing = require('../models/thing');
const e = require('express');
const fs = require('fs');

// requète sur une seul sauce de la D.B, grâce a l'id

exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
      .then(things => res.status(200).json(things))
      .catch(error => res.status(404).json({ error }));
};

// requète sur toutes les sauces de la D.B

exports.getAllThings = (req, res, next) => {
  Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
};

// création d'une sauce, avec son schéma, ainsi que l'url de l'image importé

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.sauce);
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

// la modification d'une sauce

exports.modifyThing = (req, res, next) => {
  const thingObject = req.file ?
  { 
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   } : { ...req.body };
  Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'message modifié !' }))
      .catch(error => res.status(400).json({ error }));
};

// la supréssion d'une sauce

exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};