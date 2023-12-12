const projectId = 'pro-signal-407805';
const cloudKey = 'cloudKey.json';

const cloud = {
    "type": "service_account",
    "project_id": "pro-signal-407805",
    "private_key_id": "f1dfe10e7801b55d333c5a64bce6f1cfa55d69d8",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDYca/z423xrc7/\n0fJs9YKNs5K7X6FFsbzeYKzRnIq4vKcxlYqJGCU08WuVHlzFvH4SC7S2/44wLR2t\nW/KlWbRTqAeq76r4WsVqZrH5vqilNWKIbv6saFc/xuZSU+oIJMlb126JOCJ49QE7\nMjeExMNCdd2qicToVPpClduqS0MO+skSeATYbKTxtDatRh8g0iCdK8ZRkcJll7+p\nyqQndKgLqDwRhDjVDmZlnINxP5ayyp+iQJP0C3kh4g+6adMrBYDuP5xhjvD6VIQ+\nZAeTbevlyJ7OGlVpXpTrDKcgtXIXfPiiJmrKIjtkXfORaW3VmkvM9vhDoe1sL8ss\nVhSerCknAgMBAAECggEAB3m5uYMv32qA3T4LkO7T0QAUP8t4Pvd6DfYp0d2Fvwap\nAaHoFH8UfeUesZpIWv39HrNvzOg7qXdNcJjd4w8bls4VYbaAYa6E5f1hBT6sBXS4\nD/1BZ4P9C3Nbrhk+2oQmvjjNFQkuy52uqrQ7zaacFdYLT2INvnZ85ELXwORzjvdT\nKctOu6ZugeSXUwDCbgT6IlNppZ1Q6cuAY+ccBBWnl0EnsVk2dqk6EfEQ/+IBGU5N\n4rTfZUTg5fGkkdhTuEh0gYZpzNrzNxGbXRCiPcm+OWebNadEUa3hVcRIBaieK5ZD\n5xo+OLs4XMVJjpDcbZIPrbx7dCX1UhDrbm7/6Qz6wQKBgQDw8q0Dfe26RyW3fanb\nzCkWfqCwhNoZjq10WLTIMsf342gD8+rpg+T9tP5rHdplpVpvQ6rShoWDs7IK6mP2\nKXDUrzsR9wmsIzetSKTijD2yXsKay3fK7iFTCAFv8xclEruNSIVyxSMe8xTFv5iw\nebgqRA7nW9eC9DObDSL2mdnJwQKBgQDl9yMbQgw3XgitCXyL2i8231DJHYfttFEG\nHGGWmqDZct5We3tcHIySHygVKiuR1I9wcF5wQ1zigaLQHBgCJZVDH2poAOoIRgbL\nAjAYmJRCchARjYX8jEtzH/25XLVV/J6keuuFZXoKEKAr+FW+uU3xYKAAGG7sE917\nWXQcQpYc5wKBgQCHaduSetOAPTwVQ6qSvMrauY/VpNRuSKFzIed4HBIGXue2UP9U\n/atUasQRr1Vuit+oaH84kiG3QuZs/A3x6phe75xjHFNzStefq5P/PpHuDRORq4hH\npE1WPMmSASygyUZewMM/HUv/uN2TxXoqtD2sg1Nc82DLWDMokNl1fkHIAQKBgG8I\ni3fOxQ06pt+9c9gmqaNJ4bypOIdKB9D2hRvtXvp+3uFMz7wiwLCQwI6vhMftpLA6\nYS69J6zpwM3QsrreoJn/IiZDQrxp6z+7t7M4gGUwo5eGCIpuxsM4UA5et+NjjMmH\n3A3VeD5B1sRELEphOEPyTm6dXXk5AjhbcZdvgwFDAoGBAL15nEq30xnW++LRYmhg\nV2WCpbanwP0N6qA8bJPbu54XP6fZIxAub8rs7MY1WgKTuNw11lNgXMwBFXOmTCTp\ni95AGaqjYsinBerLodCdv5WMXVNWpd0uoQUJrozgYZxkF5nmw3oK0QMpvdIvpmwa\nt0489pVUmTe4sdb4QBJpeBcJ\n-----END PRIVATE KEY-----\n",
    "client_email": "uwise-714@pro-signal-407805.iam.gserviceaccount.com",
    "client_id": "107248586437267491487",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/uwise-714%40pro-signal-407805.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  

const {Storage} = require('@google-cloud/storage');

async function authenticateImplicitWithAdc() {
  // This snippet demonstrates how to list buckets.
  // NOTE: Replace the client created below with the client required for your application.
  // Note that the credentials are not specified when constructing the client.
  // The client library finds your credentials using ADC.
  const storage = new Storage({
    projectId,
    cloud,
  });
  

  const [buckets] = await storage.getBuckets();

  for (const bucket of buckets) {
    console.log(`- ${bucket.name}`);
  }

  console.log('Listed all storage buckets.');
}

authenticateImplicitWithAdc();
