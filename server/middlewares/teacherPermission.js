

const teacherPermission = (req, res, next) => {
    console.log('teacher permisiions, req.params.teacherEmail ' + req.user+' req.user.username '+req.params.teacherEmail)
    try {
        if (req.role != 'teacher')
            throw Error('No permission');
        if (req.params.id && req.params.id != req.user._id) {
            throw Error('No permission');
        }
        else if (req.params.teacherEmail != req.user.email)
            throw Error('No permission');
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
    console.log('pass teacher premission');
    next();
}

export default teacherPermission;