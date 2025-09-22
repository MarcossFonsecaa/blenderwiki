import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, LogOut } from 'lucide-react'

const Header = ({ currentUser, onShowLogin, onLogout }) => {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              type="text"
              placeholder="Buscar documentos, APIs, discussões..."
              className="pl-10 pr-4"
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-foreground">
                Olá, {currentUser.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="flex items-center space-x-2"
              >
                <LogOut size={14} />
                <span>Sair</span>
              </Button>
            </div>
          ) : (
            <Button onClick={onShowLogin} variant="default">
              Entrar
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

