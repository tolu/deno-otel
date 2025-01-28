// wait a second
await new Promise(resolve => setTimeout(resolve, 1000));

// make requests ten times with 500ms wait times
for (let i = 0; i < 10; i++) {
  const url = `http://localhost:8000/${i}`;
  console.log('Calling', url);
  await fetch(url);
  await new Promise(resolve => setTimeout(resolve, 500));
}