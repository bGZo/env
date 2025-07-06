# current policy
echo "before policy list:"
Get-ExecutionPolicy -List

# we want to execute script
# Cannot set execution policy. 
# Execution policies at the MachinePolicy or UserPolicy 
# scopes must be set through skip those two scope.
Set-ExecutionPolicy Undefined -Scope Process
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

echo "after policy list:"
Get-ExecutionPolicy -List
