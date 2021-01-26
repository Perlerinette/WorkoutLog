# Testing screenshots of Workout server


USER - REGISTER
![](images/user_register.png)

USER - LOGIN
![](images/user_login.png)

LOG - CREATE
![](images/log_create.png)

LOG - GET ALL
![](images/log_getAll.png)

LOG - GET by ID
from User 1
![](images/log_getById2.png)
from User 2
![](images/log_getById_Authorized.png)

LOG - UPDATE
logged as user 2 (authorized to modify logs 3 and 4)
![](images/log_updated_Authorized.png)
see update with Get by Id
![](images/log_updated_proof_Authorized.png)

logged as user 2 (cannot modify logs 1 and 2)
![](images/log_NotUpdated_NotAuthorized.png)
log does not exist
![](images/log_NotUpdated_Authorized.png)


LOG - DELETE
logged as user 2 (authorized to delete logs 3 and 4)
![](images/log_deleted_Authorized.png)
see deletion with Get All
![](images/log_deleted_proof_Authorized.png)

logged as user 2 (cannot delete logs 1 and 2)
![](images/log_NotDeleted_NotAuthorized.png)
log does not exist
![](images/log_NotDeleted_Authorized.png)
