

const teacherPermission = (req, res, next) => {
    try {
        if (req.role != 'teacher')
            throw Error('No permission');
        const teacherEmail=req.params.email.toLowerCase();
        const userEmail=req.user.email.toLowerCase();
        console.log("h",teacherEmail+userEmail)
        if (req.params.id &&teacherEmail!=userEmail) {
            throw Error('No permission');
        }
        else if (teacherEmail!=userEmail)
        {   
             throw Error('No permission');
}
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
    next();
}

export default teacherPermission;