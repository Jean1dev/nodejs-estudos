'use strict'
const aws = require('aws-sdk')
const s3 = new aws.S3()
const sharp = require('sharp')
const { basename, extname } = require('path')

module.exports.optimize = async ({ Records: records }, context) => {
    try{
        await Promise.all(records.map(async item => {
            console.log(item)
            const { key } = item.s3.object
            const image = await s3.getObject({
                Bucket: process.env.bucket,
                Key: key
            }).promise()

            const optmized = await sharp(image.Body)
                .resize(1280, 720, { fit: 'inside', withoutEnlargement: true })
                .toFormat('jpeg', { progressive: true, quality: 50 })
                .toBuffer()

            await s3.putObject({
                body: optmized,
                Bucket: process.env.bucket,
                ContentType: 'image/jpeg',
                Key: `compressed/${basename(key, extname(key))}.jpg`
            }).promise()
        }))

        return {
            statusCode: 301,
            body: { ok: true }
        }
    }catch(e){
        return e
    }
}