import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;
let connectionError: string | null = null;

function sanitizeMongoUri(rawUri?: string): string | null {
  if (!rawUri) return null;
  let uri = rawUri.trim();

  // If password was wrapped in literal angle brackets like <password>
  const angleBracketMatch = uri.match(/^(mongodb(?:\+srv)?:\/\/[^:]+:)<([^>]+)>(@.+)$/);
  if (angleBracketMatch) {
    const prefix = angleBracketMatch[1];
    const password = encodeURIComponent(angleBracketMatch[2]);
    const suffix = angleBracketMatch[3];
    uri = `${prefix}${password}${suffix}`;
  }

  // Ensure default database name tvb_platform is targeted if root '/'
  if (uri.includes('.mongodb.net/?') || uri.endsWith('.mongodb.net/')) {
    uri = uri.replace('.mongodb.net/?', '.mongodb.net/tvb_platform?');
  } else if (uri.endsWith('.mongodb.net')) {
    uri = `${uri}/tvb_platform`;
  }

  return uri;
}

export async function connectToDatabase(): Promise<boolean> {
  const uri = sanitizeMongoUri(process.env.MONGODB_URI);

  if (!uri) {
    connectionError = 'MONGODB_URI is not set in environment variables';
    console.log('[MongoDB] URI not set. Using in-memory fallback dataset.');
    return false;
  }

  try {
    console.log('[MongoDB] Connecting to MongoDB Atlas cluster...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
    });
    isConnected = true;
    connectionError = null;
    console.log('[MongoDB] Successfully connected to MongoDB Atlas on database:', mongoose.connection.name);
    return true;
  } catch (error: any) {
    isConnected = false;
    connectionError = error?.message || 'Failed to connect to MongoDB Atlas';
    console.warn('[MongoDB] Atlas connection notice:', connectionError);
    return false;
  }
}

export function getDbStatus() {
  return {
    connected: isConnected && mongoose.connection.readyState === 1,
    readyState: mongoose.connection.readyState,
    error: connectionError,
    databaseName: mongoose.connection.name || 'tvb_platform'
  };
}
