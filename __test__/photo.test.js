const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const {generateToken} = require("../helpers/jwt")

  let token;
  let photoId;

  beforeAll(async () => {
    try {
      const userRegister =
      await request(app)
        .post("/users/register")
        .send({
          username: 'andreas',
          email: 'andreas@mail.com',
          password: 'andreas',
      })

      const userLogin =
        await request(app)
          .post('/users/login')
          .send({
            email: 'andreas@mail.com',
            password: 'andreas',
      });
      dataOfUser = userLogin.body;
      token = generateToken(dataOfUser);
    } catch (error) {
      console.log(error)
    }
  });

  describe("POST /photos", () => {
    //data success test
    const photoBaru = {
      title: "title test success",
      caption: "title caption success",
      image_url: "image url test success",
    };

    //201 response
    it('should send response with a 201 status code', async() => {
      const res = await request(app)
        .post('/photos')
        .set('token', token)
        .send(photoBaru)
      photoId = res.body.id;
      console.log(res.body.id, "<<res body")
          expect(res.statusCode).toEqual(201);
          expect(typeof res.body).toEqual("object");
          expect(res.body).toHaveProperty("id");
          expect(res.body).toHaveProperty("title");
          expect(res.body).toHaveProperty("caption");
          expect(res.body).toHaveProperty("image_url");
          expect(res.body).toHaveProperty("UserId");
          expect(res.body.title).toEqual(photoBaru.title);
          expect(res.body.caption).toEqual(photoBaru.caption);
          expect(res.body.image_url).toEqual(photoBaru.image_url);
    });

    //data erorr test
    const errorTestPhoto = {
      title: "title error",
      caption: "caption error",
      image_url: "image url error",
    };

    //401 response
    it('should send a response with a 401 status code', async() => {
      const res = await request(app)
        .post('/photos')
        .send(errorTestPhoto)
          expect(res.statusCode).toEqual(401);
          expect(typeof res.body).toEqual('object');
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toEqual("token not provided");
          console.log(res.body.message, "<< message token not provided");
    });
  });



  describe("GET /photos", () => {

    // response 200
    it('should send response with a 200 status code', async () => {
      const res = await request(app)
        .get('/photos')
        .set('token', token)
      expect(res.statusCode).toEqual(200)
      expect(typeof res.body).toEqual('object')
      const photo = res.body[0]
      expect(photo).toHaveProperty("id")
      expect(photo).toHaveProperty("title")
      expect(photo).toHaveProperty("caption")
      expect(photo).toHaveProperty("image_url")
      expect(photo).toHaveProperty("image_url")
      expect(photo).toHaveProperty("UserId")
      expect(photo).toHaveProperty("createdAt")
      expect(photo).toHaveProperty("updatedAt")
      expect(photo).toHaveProperty("User")
    });

    // response 401
    it('should send response with a 401 status code', async () => {
      const res = await request(app)
        .get('/photos')
      expect(res.statusCode).toEqual(401)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toEqual("token not provided");
      console.log(res.body.message, "<< message token not provided");

    });
  })



  describe("GET /photos/:id", () => {
    it('should send response with a 200 status code', async () => {
      const res = await request(app)
        .get(`/photos/${photoId}`)
        .set('token', token)
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual('object');
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("title");
        expect(res.body).toHaveProperty("caption");
        expect(res.body).toHaveProperty("image_url");
        expect(res.body).toHaveProperty("UserId");
        expect(res.body).toHaveProperty("createdAt");
        expect(res.body).toHaveProperty("updatedAt");
    })

    it('should send response with a 404 status code', async () => {
      const res = await request(app).get("/photos/23456").set('token', token)    
      expect(res.statusCode).toEqual(404)
      expect(typeof res.body).toEqual('object')
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toEqual("Not Found");
      console.log(res.body)
    });
  })

  afterAll(async () => {
    try {
      await sequelize.queryInterface.bulkDelete('Users', {});
      await sequelize.close()
    } catch (error) {
      console.log(error);
    }
  });




