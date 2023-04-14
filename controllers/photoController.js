const {
    Photo,
    User
} = require("../models")
  
class PhotoController{

    static async GetPhotos(req, res) {
        try {
            const { id } = req.UserData
            const data = await Photo.findAll({
                where: {
                  UserId:id  
                },
                include: [
                    {
                        model: User
                    }
                ]
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(error?.code || 500).json(error)
            console.log("tes")
        }
    }
    
    static async GetPhotosById(req, res) {
        try {
            const { id } = req.params
            const { id: userId } = req.UserData
            const data = await Photo.findOne({
                where: {
                    id,
                }
            })
            if (!data) {
                throw {
                    code: 404,
                    message: 'Not Found'
                }
            }
            if (data.UserId !== userId) {
                throw{
                  code: 403,
                  message: "Forbiden"
                }
              } 
            res.status(200).json(data)
        } catch (error) {
            res.status(error?.code || 500).json(error)
            console.log(error)
        }
    }

    static async createPhoto(req, res) {
        try {
    
          const { 
            title,
            caption,
            image_url
          } = req.body
    
          const { id } = req.UserData
    
          const result = await Photo.create({
            title,
            caption,
            image_url,
            UserId: id
          })
         
          res.status(201).json(result)
        } catch (error) {
          res.status(error?.code || 500).json(error)
        }
    }
    
    static async updatePhoto(req, res) {
        try {
            const { id } = req.params
            const { title, caption, image_url } = req.body
            const result = await Photo.update({
                title,
                caption,
                image_url
            }, {
                where: {
                    id
                },
                returning:true
            })
            res.status(200).json(result)
        } catch (error) {
            res.status(error?.code || 500).json(error)
        }
    }

    static async deletePhoto(req, res) {
        try {
            const { id } = req.params
            const result = await Photo.destroy({
                where: {
                    id
                }
            })
            res.status(200).json(result)
        } catch (error) {
            res.status(error?.code || 500).json(error)
        }
    }
}

module.exports = PhotoController
