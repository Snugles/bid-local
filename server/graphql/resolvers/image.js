const { join, parse } = require('path');
const { createReadStream, createWriteStream } = require('fs');

exports.get_info = () => 'Hello from image uploader';

exports.image_uploader = async (_, { file }, { model }) => {
  let { filename, createReadStream } = await file;
  let stream = createReadStream();
  let { ext, name } = parse(filename);
  name = name.replace(/([^a-z0-9]+)/gi, '-').replace(' ', '_');
  let serverFile = join(__dirname, `../../../server/uploads/${name}-${Date.now()}${ext}`);
  let writeStream = await createWriteStream(serverFile);
  await stream.pipe(writeStream);
  serverFile = `http://localhost:8000${serverFile.split('uploads')[1]}`;
  return serverFile;
};