// progress.js

// Example placeholder data
const memoryData = [12, 9, 15]; // time taken for each level
const reactionData = [0.45, 0.39, 0.52]; // avg reaction times

// Setup charts
const memoryCtx = document.getElementById('memoryChart').getContext('2d');
new Chart(memoryCtx, {
  type: 'bar',
  data: {
    labels: ['Level 1', 'Level 2', 'Level 3'],
    datasets: [{
      label: 'Memory Game Time (s)',
      data: memoryData,
      backgroundColor: 'rgba(54, 162, 235, 0.7)'
    }]
  }
});

const reactionCtx = document.getElementById('reactionChart').getContext('2d');
new Chart(reactionCtx, {
  type: 'line',
  data: {
    labels: ['Level 1', 'Level 2', 'Level 3'],
    datasets: [{
      label: 'Reaction Time (s)',
      data: reactionData,
      borderColor: 'rgba(255, 99, 132, 0.7)',
      fill: false
    }]
  }
});
