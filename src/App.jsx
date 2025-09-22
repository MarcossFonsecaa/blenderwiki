import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import DocumentsPage from './components/pages/DocumentsPage'
import ApiPage from './components/pages/ApiPage'
import ForumPage from './components/pages/ForumPage'
import SettingsPage from './components/pages/SettingsPage'
import LoginModal from './components/auth/LoginModal'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <div className="flex">
          {/* Sidebar */}
          <Sidebar 
            currentUser={currentUser}
            onShowLogin={() => setShowLoginModal(true)}
          />
          
          {/* Main Content */}
          <div className="flex-1 ml-64">
            <Header 
              currentUser={currentUser}
              onShowLogin={() => setShowLoginModal(true)}
              onLogout={() => setCurrentUser(null)}
            />
            
            <main className="p-6">
              <Routes>
                <Route path="/" element={<DocumentsPage currentUser={currentUser} onShowLogin={() => setShowLoginModal(true)} />} />
                <Route path="/api" element={<ApiPage />} />
                <Route path="/forum" element={<ForumPage currentUser={currentUser} onShowLogin={() => setShowLoginModal(true)} />} />
                <Route path="/settings" element={<SettingsPage currentUser={currentUser} />} />
              </Routes>
            </main>
          </div>
        </div>

        {/* Login Modal */}
        {showLoginModal && (
          <LoginModal 
            onClose={() => setShowLoginModal(false)}
            onLogin={setCurrentUser}
          />
        )}
      </div>
    </Router>
  )
}

export default App

