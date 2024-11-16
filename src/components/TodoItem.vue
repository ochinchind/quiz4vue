<template>
    <div :class="['todo-item', task.priority, { completed: task.completed }]">
      <div class="task-info">
        <div class="task-status" >
            {{ task.completed ? "Completed" : "Pending" }}
        </div>
        <input
          type="checkbox"
          :checked="task.completed"
          @change="$emit('toggle', task.id)"
          class="task-checkbox"
        />
        <input
          type="text"
          :value="task.title"
          @input="$emit('edit', task.id, $event.target.value)"
          class="task-title"
        />
      </div>

      <div class="task-actions">
        <button @click="$emit('delete', task.id)" class="delete-button"><svg xmlns="http://www.w3.org/2000/svg" x="20px" y="20px" width="20" height="20" viewBox="0 0 50 50">
<path d="M 42 5 L 32 5 L 32 3 C 32 1.347656 30.652344 0 29 0 L 21 0 C 19.347656 0 18 1.347656 18 3 L 18 5 L 8 5 C 7.449219 5 7 5.449219 7 6 C 7 6.550781 7.449219 7 8 7 L 9.085938 7 L 12.695313 47.515625 C 12.820313 48.90625 14.003906 50 15.390625 50 L 34.605469 50 C 35.992188 50 37.175781 48.90625 37.300781 47.515625 L 40.914063 7 L 42 7 C 42.554688 7 43 6.550781 43 6 C 43 5.449219 42.554688 5 42 5 Z M 20 44 C 20 44.554688 19.550781 45 19 45 C 18.449219 45 18 44.554688 18 44 L 18 11 C 18 10.449219 18.449219 10 19 10 C 19.550781 10 20 10.449219 20 11 Z M 20 3 C 20 2.449219 20.449219 2 21 2 L 29 2 C 29.550781 2 30 2.449219 30 3 L 30 5 L 20 5 Z M 26 44 C 26 44.554688 25.550781 45 25 45 C 24.449219 45 24 44.554688 24 44 L 24 11 C 24 10.449219 24.449219 10 25 10 C 25.550781 10 26 10.449219 26 11 Z M 32 44 C 32 44.554688 31.554688 45 31 45 C 30.445313 45 30 44.554688 30 44 L 30 11 C 30 10.449219 30.445313 10 31 10 C 31.554688 10 32 10.449219 32 11 Z"></path>
</svg></button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    props: {
      task: {
        type: Object,
        required: true,
      },
    },
  });
  </script>
  
  <style scoped>
  .todo-item {
    width: 500px;
    padding: 15px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-left: 5px solid;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin: 10px 0;
  }
  
  .todo-item.completed {
    opacity: 0.6;
  }
  
  .todo-item.low {
    border-color: green;
  }
  
  .todo-item.medium {
    border-color: orange;
  }
  
  .todo-item.high {
    border-color: red;
  }
  
  .task-info {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 10px;
    overflow: auto;

  }
  
  .task-checkbox {
    transform: scale(1.2);
  }
  
  .task-title {
    flex: 1;
    font-size: 16px;
    border: none;
    background: none;
    padding: 5px;
  }
  
  .task-actions {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    width: 100%;
  }
  
  .delete-button {
    background: none;
    border: none;
    cursor: pointer;
    color: red;
    font-size: 20px;
  }

  .task-status {
    font-weight: bold;

  }
  </style>
  