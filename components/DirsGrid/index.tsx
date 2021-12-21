import { PodDir } from 'contexts/Dirs';
import Link from 'next/link';

interface Props {
  pod: string;
  dirs: PodDir[];
}

const DirsGrid = ({ pod, dirs }: Props) => {
  return (
    <div className="flex flex-wrap my-6">
      {dirs &&
        dirs.map((dir, key: number) => (
          <div key={key} className="text-purple">
            <Link href={`/pods/${pod}/${dir.name}`}>
              <a className="inline-block w-72 h-72 mr-12 rounded-lg bg-gray"></a>
            </Link>
            <footer className="px-2 py-3">
              <div>
                <strong>{dir.name}</strong>
              </div>
              <div>
                {new Intl.DateTimeFormat('en-GB', {
                  dateStyle: 'long',
                }).format(Number(dir.creation_time) * 1000)}
              </div>
            </footer>
          </div>
        ))}
    </div>
  );
};

export default DirsGrid;
