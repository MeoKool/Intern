import { useState, useEffect } from 'react';
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import './Navbar.css'
import CloseIcon from '@mui/icons-material/Close';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import SnippetFolderOutlinedIcon from '@mui/icons-material/SnippetFolderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

export default function Navbar() {

	const [toggle, setToggle] = useState(false)

	const MenuArr = [
		{
			id: 'home',
			name: 'Home',
			icon: <HomeOutlinedIcon />,
			submenu: []
		},
		{
			id: 'syllabus',
			name: 'Syllabus',
			icon: <ImportContactsIcon />,
			submenu: [
				{
					id: 'view-syllabus',
					name: 'View syllabus'
				},
				{
					id: 'create-syllabus',
					name: 'Create syllabus'
				}
			]
		},
		{
			id: 'training-program',
			name: 'Training Program',
			icon: <BiotechOutlinedIcon />,
			submenu: [
				{
					id: 'view-program',
					name: 'View program'
				},
				{
					id: 'create-program',
					name: 'Create program'
				}
			]
		},
		{
			id: 'class',
			name: 'Class',
			icon: <SchoolOutlinedIcon />,
			submenu: [
				{
					id: 'view-class',
					name: 'View class'
				},
				{
					id: 'create-class',
					name: 'Create class'
				}
			]
		},
		{
			id: 'training-calendar',
			name: 'Training calendar',
			icon: <CalendarTodayOutlinedIcon />,
			submenu: []
		},
		{
			id: 'user-management',
			name: 'User management',
			icon: <GroupOutlinedIcon />,
			submenu: [
				{
					id: 'user-list',
					name: 'User list'
				},
				{
					id: 'user-permission',
					name: 'User permission'
				}
			]
		},
		{
			id: 'learning-materials',
			name: 'Learning materials',
			icon: <SnippetFolderOutlinedIcon />,
			submenu: []
		},
		{
			id: 'setting',
			name: 'Setting',
			icon: <SettingsOutlinedIcon />,
			submenu: [
				{
					id: 'calendar-setting',
					name: 'Calendar'
				}
			]
		}
	]

	const [menuList, setMenuList] = useState(MenuArr)

	const handleClickMenu = (id) => {
		let menu = menuList.filter(m => m.id == id)[0]
		if (menu == null || menu.expanded == null) return

		menu.expanded = !menu.expanded
		setMenuList([...menuList])
	}

	const handleToggleMenu = () => {
		setToggle(!toggle)
	}

	useEffect(() => {
		menuList.forEach(menu => {
			menu.expanded = false
		})
	}, [])

	useEffect(() => {

	}, [menuList])

	return (
		<Box className={`navbar--box ${!toggle ? 'navbar--box-hidden' : ''}`}>
			<List component="nav" aria-label="main mailbox folders">
				<ListItemButton className='navbar--menu-close' onClick={handleToggleMenu}>
					<ListItemIcon>
						{
							toggle ? <CloseIcon />: <MenuOutlinedIcon /> 
						}
					</ListItemIcon>
				</ListItemButton>
				{
					menuList.map(menu => (
						<>
							<ListItemButton onClick={(e) => handleClickMenu(menu.id)} className='navbar--menu-btn'>
								<ListItemIcon className="navbar--menu-icon">
									{menu.icon}
								</ListItemIcon>
								{toggle && (
									<>
										<ListItemText primary={menu.name} />
										{(menu.submenu != null && menu.submenu.length > 0) && (
											menu.expanded ? <ExpandLess /> : <ExpandMore />
										)}
									</>
								)}
							</ListItemButton>
							{
								toggle && (
									<Collapse in={menu.expanded} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											{
												(menu.submenu != null && menu.submenu.length > 0) && menu.submenu.map(submenu => (
													<ListItemButton className='navbar--menu-sub-btn'>
														<ListItemText primary={submenu.name} />
													</ListItemButton>
												))
											}
										</List>
									</Collapse>
								)
							}

						</>
					))
				}

			</List>
		</Box>
	);
}
