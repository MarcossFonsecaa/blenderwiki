import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Code, 
  MessageSquare, 
  Settings, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  User
} from 'lucide-react'

const Sidebar = ({ currentUser, onShowLogin }) => {
  const location = useLocation()
  
  // Simular contador de perguntas do dia
  const todayQuestionsCount = 3
  
  const menuItems = [
    { path: '/', icon: Home, label: 'Documentos' },
    { path: '/api', icon: Code, label: 'API' },
    { path: '/forum', icon: MessageSquare, label: 'Fórum', badge: todayQuestionsCount },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ]

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-sidebar modern-sidebar z-50">
      <div className="flex flex-col h-full">
        {/* Header com logo */}
        <div className="flex items-center p-4 no-border">
          <h1 className="text-xl font-bold">
            <span className="text-primary">Blender</span>
            <span className="text-gray-600">Wiki</span>
          </h1>
        </div>

        {/* User Profile Section */}
        <div className="p-4 no-border">
          {currentUser ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center overflow-hidden">
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={20} className="text-primary-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {currentUser.name}
                </p>
                <p className="text-xs text-sidebar-foreground/70 truncate">
                  {currentUser.role}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <User size={20} className="text-muted-foreground" />
              </div>
              <div className="flex-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onShowLogin}
                  className="text-xs p-0 h-auto font-normal hover:bg-transparent"
                >
                  Fazer Login
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Add Document Button */}
        <div className="p-4">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground modern-button">
            <Plus size={16} />
            <span className="ml-2">Incluir Documento</span>
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-2">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon size={16} />
                      <span className="ml-3">{item.label}</span>
                    </div>
                    {item.badge && (
                      <div className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </div>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 no-border">
          <p className="text-xs text-sidebar-foreground/50 text-center">
            BlenderWiki v1.0
          </p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

