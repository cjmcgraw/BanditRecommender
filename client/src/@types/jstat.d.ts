declare module 'jstat';

declare class jstat {
    constructor(...args: any[]);

    abs(arg: any, func: any): any;

    add(arg: any, func: any): any;

    alter(func: any): any;

    angle(arg: any, func: any): any;

    anovafscore(): any;

    anovaftes(): any;

    antidiag(func: any): any;

    arcsine(a: any, b: any, c: any): any;

    beta(a: any, b: any, c: any): any;

    binomial(a: any, b: any, c: any): any;

    cauchy(a: any, b: any, c: any): any;

    centralF(a: any, b: any, c: any): any;

    chisquare(a: any, b: any, c: any): any;

    clear(func: any): any;

    coeffvar(fullbool: any, func: any): any;

    col(index: any, func: any): any;

    cols(func: any): any;

    create(...args: any[]): any;

    cumprod(fullbool: any, func: any): any;

    cumreduce(func: any, toAlter: any): any;

    cumsum(fullbool: any, func: any): any;

    deviation(fullbool: any, func: any): any;

    diag(func: any): any;

    diff(fullbool: any, func: any): any;

    dimensions(func: any): any;

    divide(arg: any, func: any): any;

    dot(arg: any, func: any): any;

    exp(arg: any, func: any): any;

    exponential(a: any, b: any, c: any): any;

    factorial(): any;

    factorialln(): any;

    gamma(a: any, b: any, c: any): any;

    gammafn(): any;

    gammaln(): any;

    geomean(fullbool: any, func: any): any;

    histogram(fullbool: any, func: any): any;

    hypgeom(a: any, b: any, c: any): any;

    identity(...args: any[]): any;

    invgamma(a: any, b: any, c: any): any;

    kumaraswamy(a: any, b: any, c: any): any;

    kurtosis(fullbool: any, func: any): any;

    laplace(a: any, b: any, c: any): any;

    log(arg: any, func: any): any;

    lognormal(a: any, b: any, c: any): any;

    map(func: any, toAlter: any): any;

    max(fullbool: any, func: any): any;

    mean(fullbool: any, func: any): any;

    meandev(fullbool: any, func: any): any;

    meansqerr(fullbool: any, func: any): any;

    meddev(fullbool: any, func: any): any;

    median(fullbool: any, func: any): any;

    min(fullbool: any, func: any): any;

    mode(fullbool: any, func: any): any;

    multiply(arg: any, func: any): any;

    negbin(a: any, b: any, c: any): any;

    noncentralt(a: any, b: any, c: any): any;

    norm(arg: any, func: any): any;

    normal(a: any, b: any, c: any): any;

    normalci(value: any, alpha: any): any;

    oneSidedDifferenceOfProportions(p1: any, n1: any, p2: any, n2: any): any;

    ones(...args: any[]): any;

    pareto(a: any, b: any, c: any): any;

    percentileOfScore(...args: any[]): any;

    poisson(a: any, b: any, c: any): any;

    pow(arg: any, func: any): any;

    product(fullbool: any, func: any): any;

    // Native method; no parameter or return type inference available
    push(p0: any): any;

    quantiles(...args: any[]): any;

    quartiles(fullbool: any, func: any): any;

    rand(...args: any[]): any;

    randn(...args: any[]): any;

    range(fullbool: any, func: any): any;

    rank(fullbool: any, func: any): any;

    row(index: any, func: any): any;

    rows(func: any): any;

    skewness(fullbool: any, func: any): any;

    // Native method; no parameter or return type inference available
    slice(p0: any, p1: any): any;

    // Native method; no parameter or return type inference available
    sort(p0: any): any;

    // Native method; no parameter or return type inference available
    splice(p0: any, p1: any): any;

    stdev(fullbool: any, func: any): any;

    studentt(a: any, b: any, c: any): any;

    subtract(arg: any, func: any): any;

    sum(fullbool: any, func: any): any;

    sumrow(fullbool: any, func: any): any;

    sumsqerr(fullbool: any, func: any): any;

    sumsqrd(fullbool: any, func: any): any;

    symmetric(func: any): any;

    tci(value: any, alpha: any): any;

    toArray(): any;

    transpose(func: any): any;

    triangular(a: any, b: any, c: any): any;

    tscore(value: any): any;

    ttest(value: any, sides: any): any;

    tukey(a: any, b: any, c: any): any;

    twoSidedDifferenceOfProportions(p1: any, n1: any, p2: any, n2: any): any;

    uniform(a: any, b: any, c: any): any;

    unique(fullbool: any, func: any): any;

    variance(fullbool: any, func: any): any;

    weibull(a: any, b: any, c: any): any;

    zeros(...args: any[]): any;

    zscore(value: any, flag: any): any;

    ztest(value: any, sides: any, flag: any): any;

    static PCA(X: any): any;

    static QR(x: any): any;

    static SOR(a: any, b: any, x: any, r: any, w: any): any;

    static abs(arr: any): any;

    static add(arr: any, arg: any): any;

    static alter(arr: any, func: any): any;

    static angle(arr: any, arg: any): any;

    static anovafscore(...args: any[]): any;

    static anovaftest(...args: any[]): any;

    static antidiag(arr: any): any;

    static arange(start: any, end: any, step: any): any;

    static aug(a: any, b: any): any;

    static betacf(x: any, a: any, b: any): any;

    static betafn(x: any, y: any): any;

    static betaln(x: any, y: any): any;

    static builddxmatrix(...args: any[]): any;

    static buildjxmatrix(jMat: any): any;

    static buildjymatrix(jMat: any): any;

    static buildxmatrix(...args: any[]): any;

    static buildymatrix(array: any): any;

    static cholesky(A: any): any;

    static clear(arr: any): any;

    static coeffvar(arr: any): any;

    static col(arr: any, index: any): any;

    static cola(arr: any, i: any): any;

    static cols(arr: any): any;

    static combination(n: any, m: any): any;

    static combinationln(n: any, m: any): any;

    static copy(A: any): any;

    static corrcoeff(arr1: any, arr2: any): any;

    static covariance(arr1: any, arr2: any): any;

    static create(rows: any, cols: any, func: any): any;

    static cubic_spline(X: any, F: any, value: any): any;

    static cumprod(arr: any): any;

    static cumreduce(arr: any, func: any, toAlter: any): any;

    static cumsum(arr: any): any;

    static det(a: any): any;

    static deviation(arr: any): any;

    static diag(arr: any): any;

    static diagonal(diagArray: any): any;

    static diff(arr: any): any;

    static dimensions(arr: any): any;

    static divide(arr: any, arg: any): any;

    static dot(arr: any, arg: any): any;

    static erf(x: any): any;

    static erfc(x: any): any;

    static erfcinv(p: any): any;

    static exp(arr: any): any;

    static extend(obj: any, ...args: any[]): any;

    static factorial(n: any): any;

    static factorialln(n: any): any;

    static ftest(fscore: any, df1: any, df2: any): any;

    static gammafn(x: any): any;

    static gammaln(x: any): any;

    static gammap(a: any, x: any): any;

    static gammapinv(p: any, a: any): any;

    static gauss_elimination(a: any, b: any): any;

    static gauss_jacobi(a: any, b: any, x: any, r: any): any;

    static gauss_jordan(a: any, b: any): any;

    static gauss_quadrature(): void;

    static gauss_seidel(a: any, b: any, x: any, r: any): any;

    static geomean(arr: any): any;

    static hermite(X: any, F: any, dF: any, value: any): any;

    static histogram(arr: any, binCnt: any): any;

    static householder(a: any): any;

    static ibeta(x: any, a: any, b: any): any;

    static ibetainv(p: any, a: any, b: any): any;

    static identity(rows: any, cols: any): any;

    static inv(a: any): any;

    static jMatYBar(jMatX: any, beta: any): any;

    static jStat: any;

    static jacobi(a: any): any;

    static kurtosis(arr: any): any;

    static lagrange(X: any, F: any, value: any): any;

    static log(arr: any): any;

    static loggam(x: any): any;

    static lowRegGamma(a: any, x: any): any;

    static lstsq(A: any, b: any): any;

    static lu(A: any): any;

    static map(arr: any, func: any, toAlter: any): any;

    static matrixmult(A: any, B: any): any;

    static matrixsubtract(A: any, B: any): any;

    static max(arr: any): any;

    static mean(arr: any): any;

    static meandev(arr: any): any;

    static meansqerr(arr: any): any;

    static meddev(arr: any): any;

    static median(arr: any): any;

    static min(arr: any): any;

    static mode(arr: any): any;

    static multiply(arr: any, arg: any): any;

    static norm(arr: any, p: any): any;

    static normalci(...args: any[]): any;

    static ones(rows: any, cols: any): any;

    static outer(A: any, B: any): any;

    static percentile(arr: any, k: any, exclusive: any): any;

    static percentileOfScore(arr: any, score: any, kind: any): any;

    static permutation(n: any, m: any): any;

    static pooledstdev(arr: any): any;

    static pooledvariance(arr: any): any;

    static pow(arr: any, arg: any): any;

    static product(arr: any): any;

    static qscore(...args: any[]): any;

    static qtest(...args: any[]): any;

    static quantiles(arr: any, quantilesArray: any, alphap: any, betap: any): any;

    static quartiles(arr: any): any;

    static rand(rows: any, cols: any): any;

    static randg(shape: any, n: any, m: any): any;

    static randn(n: any, m: any): any;

    static range(arr: any): any;

    static rank(arr: any): any;

    static regress(jMatX: any, jMatY: any): any;

    static regresst(jMatX: any, jMatY: any, sides: any): any;

    static residuals(jMatY: any, jMatYBar: any): any;

    static richardson(X: any, f: any, x: any, h: any): any;

    static romberg(f: any, a: any, b: any, order: any): any;

    static row(arr: any, index: any): any;

    static rowa(arr: any, i: any): any;

    static rows(arr: any): any;

    static rungekutta(f: any, h: any, p: any, t_j: any, u_j: any, order: any): any;

    static seq(min: any, max: any, length: any, func: any): any;

    static setRandom(fn: any): void;

    static significant(pvalue: any, alpha: any): any;

    static simpson(f: any, a: any, b: any, n: any): any;

    static skewness(arr: any): any;

    static slice(list: any, rcSlice: any): any;

    static sliceAssign(A: any, rcSlice: any, B: any): any;

    static spearmancoeff(arr1: any, arr2: any): any;

    static sse(jMatY: any, jMatYBar: any): any;

    static ssr(jMatYBar: any, yAverage: any): any;

    static sst(jMatY: any, yAverage: any): any;

    static stanMoment(arr: any, n: any): any;

    static stdev(arr: any, flag: any): any;

    static subtract(arr: any, arg: any): any;

    static sum(arr: any): any;

    static sumrow(arr: any): any;

    static sumsqerr(arr: any): any;

    static sumsqrd(arr: any): any;

    static symmetric(arr: any): any;

    static tci(...args: any[]): any;

    static transpose(arr: any): any;

    static triaLowSolve(A: any, b: any): any;

    static triaUpSolve(A: any, b: any): any;

    static tscore(...args: any[]): any;

    static ttest(...args: any[]): any;

    static tukeyhsd(arrays: any): any;

    static unique(arr: any): any;

    static variance(arr: any, flag: any): any;

    static xtranspx(jMatX: any): any;

    static xtranspxinv(jMatX: any): any;

    static zeros(rows: any, cols: any): any;

    static zscore(...args: any[]): any;

    static ztest(...args: any[]): any;

}

declare namespace jstat {
    class arcsine {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, a: any, b: any): any;

        static inv(p: any, a: any, b: any): any;

        static mean(a: any, b: any): any;

        static median(a: any, b: any): any;

        static mode(): void;

        static pdf(x: any, a: any, b: any): any;

        static sample(a: any, b: any): any;

        static variance(a: any, b: any): any;

    }

    class beta {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, alpha: any, beta: any): any;

        static inv(x: any, alpha: any, beta: any): any;

        static mean(alpha: any, beta: any): any;

        static median(alpha: any, beta: any): any;

        static mode(alpha: any, beta: any): any;

        static pdf(x: any, alpha: any, beta: any): any;

        static sample(alpha: any, beta: any): any;

        static variance(alpha: any, beta: any): any;

    }

    class binomial {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, n: any, p: any): any;

        static pdf(k: any, n: any, p: any): any;

    }

    class cauchy {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, local: any, scale: any): any;

        static inv(p: any, local: any, scale: any): any;

        static median(local: any): any;

        static mode(local: any): any;

        static pdf(x: any, local: any, scale: any): any;

        static sample(local: any, scale: any): any;

    }

    class centralF {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, df1: any, df2: any): any;

        static inv(x: any, df1: any, df2: any): any;

        static mean(df1: any, df2: any): any;

        static mode(df1: any, df2: any): any;

        static pdf(x: any, df1: any, df2: any): any;

        static sample(df1: any, df2: any): any;

        static variance(df1: any, df2: any): any;

    }

    class chisquare {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, dof: any): any;

        static inv(p: any, dof: any): any;

        static mean(dof: any): any;

        static median(dof: any): any;

        static mode(dof: any): any;

        static pdf(x: any, dof: any): any;

        static sample(dof: any): any;

        static variance(dof: any): any;

    }

    class exponential {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, rate: any): any;

        static inv(p: any, rate: any): any;

        static mean(rate: any): any;

        static median(rate: any): any;

        static mode(): any;

        static pdf(x: any, rate: any): any;

        static sample(rate: any): any;

        static variance(rate: any): any;

    }

    class gamma {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, shape: any, scale: any): any;

        static inv(p: any, shape: any, scale: any): any;

        static mean(shape: any, scale: any): any;

        static mode(shape: any, scale: any): any;

        static pdf(x: any, shape: any, scale: any): any;

        static sample(shape: any, scale: any): any;

        static variance(shape: any, scale: any): any;

    }

    class hypgeom {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, N: any, m: any, n: any): any;

        static pdf(k: any, N: any, m: any, n: any): any;

    }

    class invgamma {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, shape: any, scale: any): any;

        static inv(p: any, shape: any, scale: any): any;

        static mean(shape: any, scale: any): any;

        static mode(shape: any, scale: any): any;

        static pdf(x: any, shape: any, scale: any): any;

        static sample(shape: any, scale: any): any;

        static variance(shape: any, scale: any): any;

    }

    class kumaraswamy {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, alpha: any, beta: any): any;

        static inv(p: any, alpha: any, beta: any): any;

        static mean(alpha: any, beta: any): any;

        static median(alpha: any, beta: any): any;

        static mode(alpha: any, beta: any): any;

        static pdf(x: any, alpha: any, beta: any): any;

        static variance(): void;

    }

    class laplace {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, mu: any, b: any): any;

        static mean(mu: any): any;

        static median(mu: any): any;

        static mode(mu: any): any;

        static pdf(x: any, mu: any, b: any): any;

        static sample(mu: any, b: any): any;

        static variance(mu: any, b: any): any;

    }

    class lognormal {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, mu: any, sigma: any): any;

        static inv(p: any, mu: any, sigma: any): any;

        static mean(mu: any, sigma: any): any;

        static median(mu: any): any;

        static mode(mu: any, sigma: any): any;

        static pdf(x: any, mu: any, sigma: any): any;

        static sample(mu: any, sigma: any): any;

        static variance(mu: any, sigma: any): any;

    }

    class negbin {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, r: any, p: any): any;

        static pdf(k: any, r: any, p: any): any;

    }

    class noncentralt {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, dof: any, ncp: any): any;

        static pdf(x: any, dof: any, ncp: any): any;

    }

    class normal {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, mean: any, std: any): any;

        static inv(p: any, mean: any, std: any): any;

        static mean(mean: any): any;

        static median(mean: any): any;

        static mode(mean: any): any;

        static pdf(x: any, mean: any, std: any): any;

        static sample(mean: any, std: any): any;

        static variance(mean: any, std: any): any;

    }

    class pareto {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, scale: any, shape: any): any;

        static inv(p: any, scale: any, shape: any): any;

        static mean(scale: any, shape: any): any;

        static median(scale: any, shape: any): any;

        static mode(scale: any): any;

        static pdf(x: any, scale: any, shape: any): any;

        static variance(scale: any, shape: any): any;

    }

    class poisson {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, l: any): any;

        static mean(l: any): any;

        static pdf(k: any, l: any): any;

        static sample(l: any): any;

        static sampleLarge(l: any): any;

        static sampleSmall(l: any): any;

        static variance(l: any): any;

    }

    class studentt {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, dof: any): any;

        static inv(p: any, dof: any): any;

        static mean(dof: any): any;

        static median(): any;

        static mode(): any;

        static pdf(x: any, dof: any): any;

        static sample(dof: any): any;

        static variance(dof: any): any;

    }

    class triangular {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, a: any, b: any, c: any): any;

        static inv(p: any, a: any, b: any, c: any): any;

        static mean(a: any, b: any, c: any): any;

        static median(a: any, b: any, c: any): any;

        static mode(a: any, b: any, c: any): any;

        static pdf(x: any, a: any, b: any, c: any): any;

        static sample(a: any, b: any, c: any): any;

        static variance(a: any, b: any, c: any): any;

    }

    class tukey {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(q: any, nmeans: any, df: any): any;

        static inv(p: any, nmeans: any, df: any): any;

    }

    class uniform {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, a: any, b: any): any;

        static inv(p: any, a: any, b: any): any;

        static mean(a: any, b: any): any;

        static median(a: any, b: any): any;

        static mode(): void;

        static pdf(x: any, a: any, b: any): any;

        static sample(a: any, b: any): any;

        static variance(a: any, b: any): any;

    }

    class weibull {
        constructor(a: any, b: any, c: any);

        cdf(x: any): any;

        inv(x: any): any;

        mean(): any;

        median(): any;

        mode(): any;

        pdf(x: any): any;

        sample(arr: any): any;

        variance(): any;

        static cdf(x: any, scale: any, shape: any): any;

        static inv(p: any, scale: any, shape: any): any;

        static mean(scale: any, shape: any): any;

        static median(scale: any, shape: any): any;

        static mode(scale: any, shape: any): any;

        static pdf(x: any, scale: any, shape: any): any;

        static sample(scale: any, shape: any): any;

        static variance(scale: any, shape: any): any;

    }

    namespace fn {
        const length: number;

        function abs(arg: any, func: any): any;

        function add(arg: any, func: any): any;

        function alter(func: any): any;

        function angle(arg: any, func: any): any;

        function anovafscore(): any;

        function anovaftes(): any;

        function antidiag(func: any): any;

        function arcsine(a: any, b: any, c: any): any;

        function beta(a: any, b: any, c: any): any;

        function binomial(a: any, b: any, c: any): any;

        function cauchy(a: any, b: any, c: any): any;

        function centralF(a: any, b: any, c: any): any;

        function chisquare(a: any, b: any, c: any): any;

        function clear(func: any): any;

        function coeffvar(fullbool: any, func: any): any;

        function col(index: any, func: any): any;

        function cols(func: any): any;

        function create(...args: any[]): any;

        function cumprod(fullbool: any, func: any): any;

        function cumreduce(func: any, toAlter: any): any;

        function cumsum(fullbool: any, func: any): any;

        function deviation(fullbool: any, func: any): any;

        function diag(func: any): any;

        function diff(fullbool: any, func: any): any;

        function dimensions(func: any): any;

        function divide(arg: any, func: any): any;

        function dot(arg: any, func: any): any;

        function exp(arg: any, func: any): any;

        function exponential(a: any, b: any, c: any): any;

        function factorial(): any;

        function factorialln(): any;

        function gamma(a: any, b: any, c: any): any;

        function gammafn(): any;

        function gammaln(): any;

        function geomean(fullbool: any, func: any): any;

        function histogram(fullbool: any, func: any): any;

        function hypgeom(a: any, b: any, c: any): any;

        function identity(...args: any[]): any;

        function invgamma(a: any, b: any, c: any): any;

        function kumaraswamy(a: any, b: any, c: any): any;

        function kurtosis(fullbool: any, func: any): any;

        function laplace(a: any, b: any, c: any): any;

        function log(arg: any, func: any): any;

        function lognormal(a: any, b: any, c: any): any;

        function map(func: any, toAlter: any): any;

        function max(fullbool: any, func: any): any;

        function mean(fullbool: any, func: any): any;

        function meandev(fullbool: any, func: any): any;

        function meansqerr(fullbool: any, func: any): any;

        function meddev(fullbool: any, func: any): any;

        function median(fullbool: any, func: any): any;

        function min(fullbool: any, func: any): any;

        function mode(fullbool: any, func: any): any;

        function multiply(arg: any, func: any): any;

        function negbin(a: any, b: any, c: any): any;

        function noncentralt(a: any, b: any, c: any): any;

        function norm(arg: any, func: any): any;

        function normal(a: any, b: any, c: any): any;

        function normalci(value: any, alpha: any): any;

        function oneSidedDifferenceOfProportions(p1: any, n1: any, p2: any, n2: any): any;

        function ones(...args: any[]): any;

        function pareto(a: any, b: any, c: any): any;

        function percentileOfScore(...args: any[]): any;

        function poisson(a: any, b: any, c: any): any;

        function pow(arg: any, func: any): any;

        function product(fullbool: any, func: any): any;

        function push(p0: any): any;

        function quantiles(...args: any[]): any;

        function quartiles(fullbool: any, func: any): any;

        function rand(...args: any[]): any;

        function randn(...args: any[]): any;

        function range(fullbool: any, func: any): any;

        function rank(fullbool: any, func: any): any;

        function row(index: any, func: any): any;

        function rows(func: any): any;

        function skewness(fullbool: any, func: any): any;

        function slice(p0: any, p1: any): any;

        function sort(p0: any): any;

        function splice(p0: any, p1: any): any;

        function stdev(fullbool: any, func: any): any;

        function studentt(a: any, b: any, c: any): any;

        function subtract(arg: any, func: any): any;

        function sum(fullbool: any, func: any): any;

        function sumrow(fullbool: any, func: any): any;

        function sumsqerr(fullbool: any, func: any): any;

        function sumsqrd(fullbool: any, func: any): any;

        function symmetric(func: any): any;

        function tci(value: any, alpha: any): any;

        function toArray(): any;

        function transpose(func: any): any;

        function triangular(a: any, b: any, c: any): any;

        function tscore(value: any): any;

        function ttest(value: any, sides: any): any;

        function tukey(a: any, b: any, c: any): any;

        function twoSidedDifferenceOfProportions(p1: any, n1: any, p2: any, n2: any): any;

        function uniform(a: any, b: any, c: any): any;

        function unique(fullbool: any, func: any): any;

        function variance(fullbool: any, func: any): any;

        function weibull(a: any, b: any, c: any): any;

        function zeros(...args: any[]): any;

        function zscore(value: any, flag: any): any;

        function ztest(value: any, sides: any, flag: any): any;

    }

    namespace models {
        function ols(endog: any, exog: any): any;

    }

    namespace utils {
        function calcRdx(n: any, m: any): any;

        function isArray(p0: any): any;

        function isFunction(arg: any): any;

        function isNumber(num: any): any;

        function toVector(arr: any): any;

    }

}
