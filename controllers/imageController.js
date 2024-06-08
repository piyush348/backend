const imageModel = require('../models/imageModel');
const fs = require('fs')
const path = require('path')

const generateImage = async (req, res) => {
    const { searchText } = req.body
    let url = ""
    // const response = await fetch(`https://source.unsplash.com/random/400x400/?${searchText}`);
    // console.log(response.url)
    let uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.png'
    try {
        const response = await fetch(`https://source.unsplash.com/random/400x400/?${searchText}`);
        url = await response.url;

    } catch (e) {
        console.log(e)
    }

    const image = new imageModel({
        query: searchText,
        image: url
    })
    await image.save()

    res.status(200).json({
        status: 'success',
        message: 'POST Request to /api/v1/images',
        data: {
            searchText,
            url
        }
    })
}

const getImages = async (req, res) => {
    const images = await imageModel.find()
    console.log(images)
    res.status(200).json({
        status: 'success',
        message: 'GET Request to /api/v1/images',
        data: images
    })

}

module.exports = { generateImage, getImages }