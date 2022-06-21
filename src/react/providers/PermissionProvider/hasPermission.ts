export function hasPermission (userPermissions: string[], permission: string): boolean {
    if (Array.isArray(permission)) {
        return permission.every(p => _hasPermission(userPermissions, p, 0))
    }
    return _hasPermission(userPermissions, permission, 0)
}

export function _hasPermission (userPermissions: string[], permission:string, count: number): boolean {
    if (count === userPermissions.length) return false
    const userPermission = userPermissions[count]
    if (userPermission === '*') return true
    if (userPermission === permission) return true
    if (isParentPermission(userPermission, permission)) return true
    return _hasPermission(userPermissions, permission, count + 1)
}

export function isParentPermission (parent: string, child: string): boolean {
    if (!parent || !child) return false
    const parentArray = parent.split('.')
    const childArray = child.split('.')

    return doesMatch(parentArray, childArray, 0)
}

function doesMatch (ps: string[], cs: string[], count: number): boolean {
    if (count === ps.length || count === cs.length) return false
    if (ps[count] === cs[count]) return doesMatch(ps, cs, count + 1)
    else return ps[count] === '*'
}

export default hasPermission