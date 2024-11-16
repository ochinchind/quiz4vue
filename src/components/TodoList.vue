<template>
    <div class="todo-app">
      <h1 class="app-title">My To-Do List</h1>
  
      <div class="todo-header">
        <input
          v-model="newTaskTitle"
          placeholder="Task Title"
          class="todo-input"
        />
        <select v-model="newTaskPriority" class="todo-select">
          <option disabled value="">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button @click="addTask" class="todo-button">Add Task</button>
      </div>

      <div class="errors">

      </div>
  
      <p class="task-count">
        <span class="pending-count">{{ pendingTasksCount }}</span> Pending Task(s)
      </p>
  
      <transition-group tag="div" name="list" class="todo-list">
        <TodoItem
          v-for="task in sortedTasks"
          :key="task.id"
          :task="task"
          @delete="deleteTask"
          @toggle="toggleTaskCompletion"
          @edit="editTaskTitle"
        />
      </transition-group>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, computed, nextTick } from "vue";
  import TodoItem from "./TodoItem.vue";
  
  interface Task {
    id: number;
    title: string;
    priority: "low" | "medium" | "high";
    completed: boolean;
  }
  
  export default defineComponent({
    name: "TodoList",
    components: { TodoItem },
    setup() {
      const tasks = ref<Task[]>([
        { id: 1, title: "Learn Nuxt", priority: "low", completed: false },
        {
          id: 2,
          title: "Call dad",
          priority: "high",
          completed: true,
        },
      ]);
  
      const newTaskTitle = ref("");
      const newTaskPriority = ref<"low" | "medium" | "high" | "">("");
  
      const addTask = () => {
        if (newTaskPriority.value === "") {
            const errors = document.querySelector('.errors') as HTMLElement;
            errors.innerHTML = 'Please select a priority';

          return;
        }

        if (newTaskTitle.value.trim() && newTaskPriority.value) {
          const newTask: Task = {
            id: Date.now(),
            title: newTaskTitle.value.trim(),
            priority: newTaskPriority.value,
            completed: false,
          };
          tasks.value.push(newTask);
  
          newTaskTitle.value = "";
          newTaskPriority.value = "";
  
          nextTick(() => {
            const lastTask = document.querySelector(".todo-list > div:last-child");
            lastTask?.scrollIntoView({ behavior: "smooth" });
          });
        }
      };
  
      const deleteTask = (id: number) => {
        tasks.value = tasks.value.filter((task) => task.id !== id);
      };
  
      const toggleTaskCompletion = (id: number) => {
        const task = tasks.value.find((task) => task.id === id);
        if (task) task.completed = !task.completed;
      };
  
      const sortedTasks = computed(() =>
        tasks.value.slice().sort((a, b) => {
          const priorities = { low: 1, medium: 2, high: 3 };
          return (
            priorities[b.priority as keyof typeof priorities] -
            priorities[a.priority as keyof typeof priorities]
          );
        })
      );
  
      const pendingTasksCount = computed(
        () => tasks.value.filter((task) => !task.completed).length
      );
  
      return {
        tasks,
        newTaskTitle,
        newTaskPriority,
        addTask,
        deleteTask,
        toggleTaskCompletion,
        sortedTasks,
        pendingTasksCount,
      };
    },
  });
  </script>
  
  <style scoped>
  .todo-app {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9fafb;
    border-radius: 15px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    font-family: "Arial", sans-serif;
  }
  
  .app-title {
    text-align: center;
    font-size: 24px;
    color: #343a40;
    margin-bottom: 20px;
  }
  
  .todo-header {
    display: flex;
    gap: 10px;
  }
  
  .todo-input,
  .todo-select {
    flex: 1;
    padding: 10px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    color: #495057;
  }
  
  .todo-button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .todo-button:hover {
    background-color: #0056b3;
  }
  
  .task-count {
    text-align: center;
    font-size: 18px;
    margin: 15px 0;
    color: #495057;
  }
  
  .pending-count {
    color: #007bff;
    font-weight: bold;
  }
  
  .todo-list {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
  }
  
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s;
  }
  
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }

  .errors {
    color: red;
    text-align: center;
    margin-bottom: 10px;
  }
  </style>
  