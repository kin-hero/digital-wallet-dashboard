import Fastify from 'fastify';

const fastify = Fastify({
  logger: true
});

// Health check route
fastify.get('/health', () => {
  return { status: 'ok', message: 'Server is running' };
});

// Start server
const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3001;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 Server is running on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

await start();
