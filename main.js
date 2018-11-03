var Matrix = {}
function Strassen (a, b, c, leafsize) {
    if (a.n <= leafSize) {
        mul(a, b, c);
        return;
    }

    var A = growNextPowerOf2(a);
    var B = growNextPowerOf2(b);

    var n = A.n

    var A11 = A.partition(0, 0, n / 2, n / 2, "A11")
    var A12 = A.partition(0, n / 2, n / 2, n, "A12")
    var A21 = A.partition(n / 2, 0, n, n / 2, "A21")
    var A22 = A.partition(n / 2, n / 2, n, n, "A22")

    var B11 = B.partition(0, 0, n / 2, n / 2, "B11")
    var B12 = B.partition(0, n / 2, n / 2, n, "B12")
    var B21 = B.partition(n / 2, 0, n, n / 2, "B21")
    var B22 = B.partition(n / 2, n / 2, n, n, "B22")
}

function patition (from_i, from_j, to_i, to_j, name) {
    var win = windower({
        from_i: i0 + from_i,
        to_i: i0 + to_i,
        from_j: j0 + from_j,
        to_j: j0 + to_j
    });
    return newWindowedMatrix(mat, win, name);
}

function growNextPowerOf2(orig) {
    if (orig.n !== orig.m) {
        throw "incompatible matrices, different dimensions";
    }

    var nextN = nextPow2(orig.n);
    if (nextN / 2 === orig.n) {
        // Don't need to grow it
        return orig
    }
    var grownMat = Matrix.new(nextN, nextN);
    for (var i = 0; i < orig.n; i++) {
        for (var j = 0; j < orig.n; j++) {
            grownMat.set(i, j, orig.get(i, j))
        }
    }
    return grownMat
}

function nextPow2 (n) {
    var currentPow2 = Math.floor(Math.log(n) / Math.log(2))
    return Math.pow(2, currentPow2 + 1)
}

function Strassen2n2 (a,b) {
    console.log('a ', a)
    console.log('b ',b)
    var s1 = b[0][1]-b[1][1]
    console.log('s1', s1)
    var s2 = a[0][0]+a[0][1]
    console.log('s2', s2)
    var s3 = a[1][0]+a[1][1]
    var s4 = b[1][0]-b[0][0]
    var s5 = a[0][0]+a[1][1]
    var s6 = b[0][0]+b[1][1]
    var s7 = a[0][1]-a[1][1]
    var s8 = b[1][0]+b[1][1]
    var s9 = a[0][0]-a[1][0]
    var s10 = b[0][0]+b[0][1]
    
    var p1 = a[0][0] * s1
    console.log(p1)
    var p2 = s2 * b[1][1]
    console.log(p2)
    var p3 = b[0][0] * b[0][0] 
    console.log(p3)
    var p4 = a[1][1] * s4
    console.log(p4)
    var p5 = s5 * s6
    console.log(p5)
    var p6 = s7 * s8
    console.log(p6)
    var p7 = s9 * s10
    console.log(p7)

    var c = []
    c.push( [] )
    c.push( [] )
    var c11 = p5 + p4 - p2 + p6
    console.log('c11 '+c11)
    var c12 = p1 + p2
    console.log('c12 '+c12)
    var c21 = p3 + p4
    console.log('c21 '+c21)
    var c22 = p5 + p1 - p3 - p7
    console.log('c22 '+c22)
    c[0].push(c11)
    c[0].push(c12)

    c[1].push(c21)
    c[1].push(c22)
    return c
}

var arrayA = [
    [2, 8],
    [3, 7]
]
var arrayB = [
    [0, 5],
    [3, 7]
]

function Render () {
    var reserve = Strassen2n2(arrayA, arrayB)
    console.log(reserve)
}