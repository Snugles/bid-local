const { join, parse } = require('path');
const { createReadStream, createWriteStream } = require('fs');
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: 'madhushree25',
//   api_key: '583642977899497',
//   api_secret: 'Co82eDc28-m5Vr_oRNXmKYwFHz8',
// });

exports.get_info = () => 'Hello from image uploader';

exports.image_uploader = async (_, { file }, { model }) => {
  // const uploadResponse = await cloudinary.uploader.upload(file, {});
  // console.log('Uploaded string', uploadResponse);
  let { filename, createReadStream } = await file;
  let stream = createReadStream();
  let { ext, name } = parse(filename);
  name = name.replace(/([^a-z0-9]+)/gi, '-').replace(' ', '_');
  const uploadResponse = await cloudinary.v2.uploader.upload_stream({tags: 'basic_sample'},function (err,file) {
    console.log('here');
    console.log('** Stream Upload');
    //if (err){ console.warn(err);}
    console.log('* Same image, uploaded via stream');
    console.log('* '+image.public_id);
    console.log('* '+image.url);
  });
  // let serverFile = join(__dirname, `../../../server/uploads/${name}-${Date.now()}${ext}`);
  // let writeStream = await createWriteStream(serverFile);
  // await stream.pipe(writeStream);
  // serverFile = `http://localhost:8000${serverFile.split('uploads')[1]}`;
  // return serverFile;
};