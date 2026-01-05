import React, { useState, useMemo } from 'react'
import { Plus, Trash2, Check, Filter, Calendar, Tag, Search } from 'lucide-react'

interface Todo {
  id: string
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  category: string
  createdAt: Date
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1',
      text: 'Complete project proposal',
      completed: false,
      priority: 'high',
      category: 'Work',
      createdAt: new Date()
    },
    {
      id: '2',
      text: 'Buy groceries',
      completed: true,
      priority: 'medium',
      category: 'Personal',
      createdAt: new Date()
    },
    {
      id: '3',
      text: 'Morning workout',
      completed: false,
      priority: 'medium',
      category: 'Health',
      createdAt: new Date()
    }
  ])

  const [newTodo, setNewTodo] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPriority, setSelectedPriority] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCompleted, setShowCompleted] = useState(true)

  const categories = ['All', 'Work', 'Personal', 'Health', 'Shopping', 'Other']
  const priorities = ['All', 'Low', 'Medium', 'High']

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesCategory = selectedCategory === 'All' || todo.category === selectedCategory
      const matchesPriority = selectedPriority === 'All' || 
        (selectedPriority === 'Low' && todo.priority === 'low') ||
        (selectedPriority === 'Medium' && todo.priority === 'medium') ||
        (selectedPriority === 'High' && todo.priority === 'high')
      const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCompleted = showCompleted || !todo.completed
      
      return matchesCategory && matchesPriority && matchesSearch && matchesCompleted
    })
  }, [todos, selectedCategory, selectedPriority, searchTerm, showCompleted])

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo,
        completed: false,
        priority: 'medium',
        category: 'Personal',
        createdAt: new Date()
      }
      setTodos([todo, ...todos])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Work': 'bg-blue-100 text-blue-800 border-blue-200',
      'Personal': 'bg-purple-100 text-purple-800 border-purple-200',
      'Health': 'bg-green-100 text-green-800 border-green-200',
      'Shopping': 'bg-orange-100 text-orange-800 border-orange-200',
      'Other': 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[category] || colors['Other']
  }

  const completedCount = todos.filter(t => t.completed).length
  const totalCount = todos.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Check className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  TaskMaster
                </h1>
                <p className="text-gray-600 text-sm">
                  {completedCount} of {totalCount} tasks completed
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">All systems operational</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Add Todo Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="What needs to be done?"
                className="w-full px-6 py-4 pr-12 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all hover:border-gray-300"
              />
              <Plus className="w-6 h-6 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2" />
            </div>
            <button
              onClick={addTodo}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-all"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-all"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Priority Filter */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-all"
            >
              {priorities.map(pri => (
                <option key={pri} value={pri}>{pri}</option>
              ))}
            </select>

            {/* Completed Toggle */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
              />
              <span className="text-gray-700">Show completed</span>
            </label>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {filteredTodos.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks found</h3>
              <p className="text-gray-500">Create your first task to get started!</p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <div
                key={todo.id}
                className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all duration-200 hover:shadow-xl ${
                  todo.completed 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-100 hover:border-purple-200'
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      todo.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300 hover:border-purple-500 hover:bg-purple-50'
                    }`}
                  >
                    {todo.completed && <Check className="w-4 h-4 text-white" />}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg font-medium mb-2 ${
                      todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                    }`}>
                      {todo.text}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2">
                      {/* Category */}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(todo.category)}`}>
                        {todo.category}
                      </span>
                      
                      {/* Priority */}
                      <div className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-full">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(todo.priority)}`}></div>
                        <span className="text-xs text-gray-700 capitalize">{todo.priority}</span>
                      </div>

                      {/* Date */}
                      <div className="flex items-center space-x-1 px-3 py-1 bg-gray-100 rounded-full">
                        <Calendar className="w-3 h-3 text-gray-600" />
                        <span className="text-xs text-gray-700">
                          {todo.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-3xl font-bold">{totalCount}</div>
            <div className="text-purple-100">Total Tasks</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-3xl font-bold">{completedCount}</div>
            <div className="text-green-100">Completed</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-3xl font-bold">{totalCount - completedCount}</div>
            <div className="text-blue-100">Remaining</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
