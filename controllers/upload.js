import Service from "../services/upload.js";

export default {
  async onUpload(req, res) {
    try {
      const result = await Service.onUpload(req, res);
      res.success(result);
    } catch (error) {
      res.error(error);
    }
  },
  async onFindById(req, res) {
    try {
      let base64 = await Service.findById(req.params.id);
      const img = Buffer.from(base64, "base64");
      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": img.length,
      });
      res.end(img);
    } catch (error) {
      const data = `<?xml version="1.0" encoding="UTF-8"?>
      <Error>
        <Code>AccessDenied</Code>
        <Message>Access Denied</Message>
      </Error>`;
      res.header("Content-Type", "application/xml");
      res.status(403).send(data);
    }
  },
  async onDelete(req, res) {
    try {
      const result = await Service.onDelete(req.params.id);
      res.success(result);
    } catch (error) {
      res.error(error);
    }
  },
};
