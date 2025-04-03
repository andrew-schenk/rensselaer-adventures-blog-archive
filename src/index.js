import { readdir, opendir, stat, unlink } from 'node:fs/promises';

const BASE_PATH = "rensselaeradventures.blogspot.com";

let blogData = {};
let blogPosts = [];



async function readYears() {
    try {
        const baseDirectory = await opendir(BASE_PATH);
        for await (const directoryEntry of baseDirectory) {
            if (directoryEntry.isDirectory()) {
                blogData[directoryEntry.name] = {}
            }
        }


    } catch (err) {
        console.error(err);
    }
}

async function readMonthsForYears() {
    try {
        for (const year of Object.keys(blogData)) {
            const baseDirectory = await opendir(`${BASE_PATH}/${year}`);

            for await (const directoryEntry of baseDirectory) {
                if (directoryEntry.isDirectory()) {
                    blogData[year][directoryEntry.name] = [];
                    const files = await readdir(`${BASE_PATH}/${year}/${directoryEntry.name}`);
                    for (const file of files) {
                        // console.log(file);
                        if( file !== ".DS_Store" && file !== "index.html") {
                            const fileSize = await stat(`./${BASE_PATH}/${year}/${directoryEntry.name}/${file}`);

                            blogPosts.push({
                                year: year,
                                month: directoryEntry.name,
                                filename: file,
                                filepath: `${BASE_PATH}/${year}/${directoryEntry.name}/${file}`,
                                filesize: fileSize.size
                            })
                            // console.log(file);
                        }
                        
                    }
                }
            }
        }
       
    } catch (err) {
        console.error(err);
    }
    // console.log(blogPosts);
}

async function purgeDuplicateEntries() {

    // console.log(blogPosts);

    console.log('scanning for duplicates...');

    let duplicates = [];

    blogPosts.forEach(async (post) => {


        if(duplicates.indexOf(post) === -1) {

            //console.log(post.filename.replace('.html', ''));

            const dupes = blogPosts.filter( (conditionalPost) => 
            conditionalPost.filepath.startsWith(post.filepath.replace('.html', '')) && conditionalPost.filepath !== post.filepath)

            duplicates = duplicates.concat(dupes);
        }

    });

    console.log(duplicates.map(w => w.filepath));
    //console.log(duplicates.length)

    try {

        duplicates.forEach(async dupToDelete => {
            await unlink(dupToDelete.filepath)
        }
    );
        

    } catch (error) {
        console.error(error)
    }


    // console.dir(duplicates.map(w => w.filename), {'maxArrayLength': null});
}

async function parseData() {
    await readYears();
    await readMonthsForYears();

    await purgeDuplicateEntries();
}


parseData();