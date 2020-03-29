import admin from 'firebase-admin';
import crypto from 'crypto';
import { promisify } from 'util';
import { pipeline as _pipeline } from 'stream';
import { Injectable } from '@nestjs/common';
const pipeline = promisify(_pipeline);

admin.initializeApp({
  credential: admin.credential.cert(('./firebase-key.json')),
  storageBucket: `${process.env.BUCKET_NAME}.appspot.com`
});

const bucket = admin.storage().bucket();

@Injectable()
export class FileStorageService {
  public async upload(stream: NodeJS.ReadableStream): Promise<string> {
    const filepath = `images/${this.generateImageHash()}.jpg`;
    const file = bucket.file(filepath);

    const writeStream = file.createWriteStream();

    await pipeline(
      stream,
      writeStream,
    );

    // await file.getSignedUrl({
    //   action: 'read',
    //   expires: Date.now() + 1000 * 
    // })
    // return `https://storage.googleapis.com/${bucket.name}/${(encodeURI(filepath)).replace('\/', '%2F')}`;
    return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${(encodeURI(filepath)).replace('\/', '%2F')}?alt=media`;
  }

  public generateImageHash(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}