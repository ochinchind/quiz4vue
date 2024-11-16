export default {
    watch: {
      tasks: {
        handler (newTasks: any[], oldTasks: any[]) {
          if (newTasks.length > oldTasks.length) {
            console.log('A new task was added.')
          } else {
            console.log('A task was completed or deleted.')
          }
        },
        deep: true
      }
    }
  }
  