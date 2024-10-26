import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

async function checkPermissions(req, res, next) {
  const JWT_SECRET_KEY = 'your-secret-key-here';

  try {
    
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, JWT_SECRET_KEY, async (err, decodedUser) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
      }

      req.user = decodedUser; 
      const { username } = decodedUser;

      const { action, module_name } = req.body;
      console.log(action)
      
      const validActions = ['create', 'read', 'update', 'delete'];

      if (!validActions.includes(action)) {
        return res.status(400).json({ message: 'Invalid action' });
      }

      const user = await prisma.user.findUnique({ where: { username:username } });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userRole = user.role;

      if (userRole === 'Master Admin') {
        return next();
      }

      if (userRole === 'Admin' || userRole === 'Manager') {
        if (action === 'delete') {
          return res.status(403).json({ message: 'Access Denied: Cannot perform delete action' });
        }
        return next(); 
      }

      const module = await prisma.modules.findMany({ where: { module_name } });

      

      const userPermissions = await prisma.modulesTouser.findMany({
        where:   { user_id: user.id, module_id: module[0].id } ,
      });
      if (!userPermissions[0]) {
        return res.status(403).json({ message: 'Access Denied: No permissions found for this user and module' });
      }
      console.log(userPermissions[0].r)

      const hasPermission =
        (action === 'create' && userPermissions[0].c) ||
        (action === 'read' && userPermissions[0].r) ||
        (action === 'update' && userPermissions[0].u) ||
        (action === 'delete' && userPermissions[0].d);

      if (!hasPermission) {
        return res.status(403).json({ message: 'Access Denied: Insufficient permissions for this action' });
      }

      next();
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default checkPermissions;
