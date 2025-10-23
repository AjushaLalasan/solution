const { execSync } = require('child_process');

try {
  console.log('Running tests...');
  execSync('npm test -- --watchAll=false --verbose', { stdio: 'inherit' });
  console.log('All tests passed!');
} catch (error) {
  console.error('Tests failed:', error.message);
  process.exit(1);
}