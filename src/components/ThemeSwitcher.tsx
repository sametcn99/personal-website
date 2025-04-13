'use client';

import React, { useEffect, useState } from 'react';
import { Box, IconButton, Menu, MenuItem, useTheme, Tooltip } from '@mui/material';
import {
  Moon as MoonIcon,
  Sun as SunIcon,
  Laptop as LaptopIcon
} from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Get the current theme from localStorage on component mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme || 'system';
    setTheme(savedTheme);
  }, []);

  // Set the theme to localStorage and update the document
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    } else {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
    
    handleClose();
  };

  // Handle menu open
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Show the correct icon based on the current theme
  const ThemeIcon = () => {
    if (!mounted) return null;
    
    const currentTheme = 
      theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme;

    if (currentTheme === 'dark') {
      return <MoonIcon size={20} />;
    }
    return <SunIcon size={20} />;
  };

  // Listen for system preference changes
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = () => {
        document.documentElement.classList.toggle('dark', mediaQuery.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  if (!mounted) {
    return <Box sx={{ width: 40, height: 40 }}></Box>;
  }

  return (
    <>
      <Tooltip title="Change theme">
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? 'theme-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <ThemeIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="theme-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'theme-button',
        }}
      >
        <MenuItem 
          onClick={() => handleThemeChange('light')}
          selected={theme === 'light'}
          sx={{ gap: 1.5 }}
        >
          <SunIcon size={16} />
          Light
        </MenuItem>
        <MenuItem 
          onClick={() => handleThemeChange('dark')}
          selected={theme === 'dark'}
          sx={{ gap: 1.5 }}
        >
          <MoonIcon size={16} />
          Dark
        </MenuItem>
        <MenuItem 
          onClick={() => handleThemeChange('system')}
          selected={theme === 'system'}
          sx={{ gap: 1.5 }}
        >
          <LaptopIcon size={16} />
          System
        </MenuItem>
      </Menu>
    </>
  );
}

export default ThemeSwitcher;
