import AWS from "aws-sdk";
import bluebird from "bluebird";

import {
  AMAZON_CREDENTIALS_ACCESS_KEY,
  AMAZON_CREDENTIALS_BUCKET,
  AMAZON_CREDENTIALS_SECRET_KEY,
  AMAZON_CREDENTIALS_REGION,
} from "../constants/values";

const config = {
  accessKeyId: AMAZON_CREDENTIALS_ACCESS_KEY,
  secretAccessKey: AMAZON_CREDENTIALS_SECRET_KEY,
  region: AMAZON_CREDENTIALS_REGION,
};

AWS.config.update(config);
AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();

export const sendImageToS3 = async (image) => {
  try {
    const Body = Buffer.from(
      image.uri.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    let params = {
      ACL: "public-read",
      Body,
      Bucket: AMAZON_CREDENTIALS_BUCKET,
      ContentEncoding: "base64",
      Key: image.name,
    };

    //@ts-ignore
    if (image.type) params.ContentType = image.type;

    return s3.upload(params).promise();
  } catch (error) {
    console.log('Erro ao fazer upload', error)
    throw new Error("Falha ao fazer upload");
  }
};

export const sendFileToS3 = async (file) => {
  const [, fileUri] = file.uri?.split("base64,");

  try {
    const Body = Buffer.from(fileUri, "base64");

    const params = {
      ACL: "public-read",
      Body,
      Bucket: AMAZON_CREDENTIALS_BUCKET,
      ContentEncoding: "base64",
      ContentType: file.type,
      Key: file.name,
    };

    return s3.upload(params).promise();
  } catch (error) {
    throw new Error("Falha ao fazer upload");
  }
};
