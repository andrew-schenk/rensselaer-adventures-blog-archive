import { readdir, opendir, stat } from 'node:fs/promises';

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
    //  console.log(blogPosts);
}

async function purgeDuplicateEntries() {

    // console.log(blogPosts);


    let duplicates = [];

    blogPosts.forEach(async (post) => {

        post.filesize;

        if(duplicates.indexOf(post) === -1) {

            const dupes = blogPosts.filter( (conditionalPost) => 
                conditionalPost.filesize === post.filesize && 
            conditionalPost.filename !== post.filename && 
            conditionalPost.year === post.year && conditionalPost.month === post.month)

            duplicates = duplicates.concat(dupes);
        }

    });

     console.log(duplicates.map(w => w.filepath));
    //console.log(duplicates.length)



    // console.dir(duplicates.map(w => w.filename), {'maxArrayLength': null});
}

async function parseData() {
    await readYears();
    await readMonthsForYears();

    await purgeDuplicateEntries();
}


parseData();